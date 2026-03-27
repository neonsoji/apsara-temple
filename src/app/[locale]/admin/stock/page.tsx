import React from 'react';
import { createClient } from '@supabase/supabase-js';
import StockClientList from '@/components/admin/StockClientList';
import Link from 'next/link';

interface SearchParams {
  filter?: 'all' | 'low' | 'out';
  search?: string;
  sort?: string;
}

// 🧱 1. FETCH SIMPLE ET FIABLE (Nuclear approach as requested)
async function getStockData(params: SearchParams) {
  // Directly use the server-side keys (Service Role bypasses RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Simple Select *
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name');

  // TEMPORARY DEBUG LOGS
  console.log('--- DB RESULTS ---');
  console.log('PRODUCTS:', products?.length, 'found');
  if (error) console.error('ERROR:', error);
  if (products) console.log('SAMPLES:', products.slice(0, 2));

  if (error || !products) {
    return { filtered: [], counts: { all: 0, low: 0, out: 0 } };
  }

  // 🧱 2. MINIMAL TRANSFORMS (Just what's needed for the UI)
  const mapped = products.map(p => {
    const stock = Number(p.stock) || 0;
    const reserved = Number(p.reserved_stock) || 0;
    const available = stock - reserved;
    const threshold = Number(p.low_stock_threshold) || 5;
    
    let status: 'red' | 'orange' | 'green' = 'green';
    if (available <= 0) status = 'red';
    else if (available <= threshold) status = 'orange';

    return {
      ...p,
      stock,
      reserved_stock: reserved,
      available_stock: available,
      status,
      // Fallback image if missing column or data
      image: p.image || '/placeholder.png' 
    };
  });

  const counts = {
    all: mapped.length,
    low: mapped.filter(p => p.status === 'orange').length,
    out: mapped.filter(p => p.status === 'red').length
  };

  // 🧱 3. DYNAMIC FILTERING
  let filtered = [...mapped];
  if (params.search && params.search.trim() !== '') {
    const s = params.search.toLowerCase().trim();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(s));
  }
  if (params.filter === 'low') filtered = filtered.filter(p => p.status === 'orange');
  if (params.filter === 'out') filtered = filtered.filter(p => p.status === 'red');

  filtered.sort((a, b) => {
    const priority: any = { red: 0, orange: 1, green: 2 };
    return priority[a.status] - priority[b.status];
  });

  return { filtered, counts };
}

export default async function StockPage({ 
  params: pParams, 
  searchParams 
}: { 
  params: Promise<{ locale: string }>, 
  searchParams: Promise<SearchParams> 
}) {
  const { locale } = await pParams;
  const sParams = await searchParams;
  const { filtered: products, counts } = await getStockData(sParams);

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
      
      {/* 🧩 Header & Counters */}
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-[#d4af37] tracking-widest uppercase pl-4 border-l-4 border-[#d4af37]">Cockpit Stock</h2>
           <p className="text-[10px] text-[#555] opacity-50 pl-5 uppercase tracking-tighter">Inventaire Temps Réel — Apsara Temple</p>
        </div>
        
        <div className="flex rounded-2xl overflow-hidden border border-[#222] bg-[#111] shadow-2xl">
          <FilterLink label="Tous" count={counts.all} filter="all" locale={locale} active={!sParams.filter || sParams.filter === 'all'} />
          <FilterLink label="Urgence" count={counts.low} filter="low" locale={locale} active={sParams.filter === 'low'} />
          <FilterLink label="Ruptures" count={counts.out} filter="out" locale={locale} active={sParams.filter === 'out'} />
        </div>
      </div>

      {/* 🧩 Search (Frictionless) */}
      <form className="relative">
         <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">🔍</div>
         <input 
           name="search"
           autoComplete="off"
           defaultValue={sParams.search}
           placeholder="Chercher un produit..." 
           className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-full pl-14 pr-6 py-5 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 transition-all shadow-inner"
         />
         <button className="hidden" type="submit">Submit</button>
      </form>

      {/* 🧩 BRUT DISPLAY OR INTERACTIVE LIST */}
      {products.length === 0 ? (
        <div className="text-center py-32 bg-[#0a0a0a] rounded-[3rem] border border-dashed border-[#222] flex flex-col items-center gap-6">
           <div className="w-20 h-20 rounded-full bg-[#111] flex items-center justify-center text-3xl opacity-20 border border-[#222]">📭</div>
           <div className="space-y-1">
              <p className="text-[#888] font-bold uppercase tracking-widest text-xs">Aucun produit trouvé</p>
              <p className="text-[#444] text-[10px] italic font-serif">Vérifiez vos filtres ou la base de données Supabase.</p>
           </div>
           <Link href={`/${locale}/admin/stock`} className="text-[10px] uppercase font-black tracking-[.2em] bg-[#d4af37] text-black px-8 py-4 rounded-full hover:bg-white transition-all shadow-xl active:scale-95">
              Reset Filtres
           </Link>
        </div>
      ) : (
        <StockClientList initialProducts={products} />
      )}
    </div>
  );
}

function FilterLink({ label, count, filter, active, locale }: { label: string, count: number, filter: string, active: boolean, locale: string }) {
  return (
    <a 
      href={`/${locale}/admin/stock?filter=${filter}`} 
      className={`px-8 py-5 text-[11px] font-black uppercase tracking-[.2em] transition-all gap-3 flex items-center ${active ? 'bg-[#d4af37] text-black shadow-inner' : 'bg-transparent text-[#555] hover:text-[#bbb] hover:bg-[#1a1a1a]'}`}
    >
      <span>{label}</span>
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono ${active ? 'bg-black/10' : 'bg-[#1a1a1a] text-[#444]'}`}>{count}</span>
    </a>
  );
}
