import React from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const revalidate = 60; // Refresh every minute

async function getDashboardData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // ISO string for Today (start of day, midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  // 1. Get Today's Orders (only 'paid' status)
  const { data: todayOrders, error: orderError } = await supabase
    .from('orders')
    .select('id, total, status, created_at')
    .eq('status', 'paid')
    .gte('created_at', todayISO);

  if (orderError) console.error('❌ Dashboard Order Error:', orderError);

  const orderCount = todayOrders?.length || 0;
  const revenue = todayOrders?.reduce((acc, order) => acc + (Number(order.total) || 0), 0) || 0;
  const avgBasket = orderCount > 0 ? (revenue / orderCount) : 0;

  // 2. Get Stock Alerts (based on available stock)
  const { data: stockItems } = await supabase
    .from('products')
    .select('id, name, stock, reserved_stock, low_stock_threshold, track_stock')
    .eq('track_stock', true);

  const lowStock = (stockItems || []).filter(p => {
    const available = (p.stock || 0) - (p.reserved_stock || 0);
    return available <= (p.low_stock_threshold || 5) && available > 0;
  });

  const outOfStock = (stockItems || []).filter(p => {
    const available = (p.stock || 0) - (p.reserved_stock || 0);
    return available <= 0;
  });

  // 3. Recent Orders (actionable)
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, paypal_order_id, customer_name, total, created_at, status')
    .order('created_at', { ascending: false })
    .limit(5);

  // 4. Top Products (last 7 days)
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekISO = lastWeek.toISOString();

  // Fetch items from paid orders in the last 7 days
  const { data: topSalesRaw } = await supabase
    .from('order_items')
    .select(`
      product_name, 
      quantity, 
      unit_price, 
      orders!inner(created_at, status)
    `)
    .eq('orders.status', 'paid')
    .gte('orders.created_at', lastWeekISO);

  const productStats: Record<string, { qty: number, rev: number }> = {};
  topSalesRaw?.forEach((item: any) => {
    const name = item.product_name || 'Inconnu';
    if (!productStats[name]) productStats[name] = { qty: 0, rev: 0 };
    productStats[name].qty += item.quantity;
    productStats[name].rev += item.quantity * (Number(item.unit_price) || 0);
  });

  const sortedByQty = Object.entries(productStats).sort((a, b) => b[1].qty - a[1].qty).slice(0, 5);
  const sortedByRev = Object.entries(productStats).sort((a, b) => b[1].rev - a[1].rev).slice(0, 5);

  // 5. Bonus: Orders per day (last 7 days)
  const dailyStats: Record<string, number> = {};
  // Initialize last 7 days keys
  for (let i = 6; i >= 0; i--) {
     const d = new Date();
     d.setDate(d.getDate() - i);
     dailyStats[d.toLocaleDateString('fr-FR', { weekday: 'short' })] = 0;
  }

  const { data: weekOrders } = await supabase
    .from('orders')
    .select('total, created_at')
    .eq('status', 'paid')
    .gte('created_at', lastWeekISO);

  weekOrders?.forEach(o => {
    const day = new Date(o.created_at).toLocaleDateString('fr-FR', { weekday: 'short' });
    if (dailyStats[day] !== undefined) dailyStats[day] += Number(o.total) || 0;
  });

  return {
    kpis: { orderCount, revenue, avgBasket, lowStockCount: lowStock.length, outOfStockCount: outOfStock.length },
    urgent: { lowStock, outOfStock, recentOrders: recentOrders || [] },
    topProducts: { sortedByQty, sortedByRev },
    chartData: Object.entries(dailyStats)
  };
}

export default async function DashboardPage() {
  const { kpis, urgent, topProducts, chartData } = await getDashboardData();

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* KPI Section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[#d4af37] mb-6">KPIs — Aujourd'hui</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <KPICard label="Commandes" value={kpis.orderCount} suffix="" />
          <KPICard label="Chiffre d'Affaires" value={kpis.revenue.toFixed(2)} suffix="€" />
          <KPICard label="Panier Moyen" value={kpis.avgBasket.toFixed(2)} suffix="€" color="#aaa" />
          <KPICard label="Stock Faible" value={kpis.lowStockCount} suffix="" color={kpis.lowStockCount > 0 ? "#f59e0b" : "#666"} />
          <KPICard label="Rupture" value={kpis.outOfStockCount} suffix="" color={kpis.outOfStockCount > 0 ? "#ef4444" : "#666"} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Urgent Section */}
        <section className="space-y-8">
          <SectionTitle title="🛒 Opérations (À traiter)" />
          
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-8 transition-all hover:border-[#333] shadow-xl">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-semibold text-[#888] uppercase tracking-widest">5 dernières commandes</h3>
               <Link href="/admin/orders" className="text-[9px] uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/20 px-2 py-1 rounded hover:bg-[#d4af37] hover:text-black transition-all">Voir tout</Link>
            </div>
            <div className="space-y-4">
              {urgent.recentOrders.length > 0 ? urgent.recentOrders.map(order => (
                <div key={order.id} className="group flex justify-between items-center py-4 border-b border-[#222]/50 last:border-0 hover:bg-[#1a1a1a] px-4 rounded-xl transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-[#111] border border-[#d4af37]/20 flex items-center justify-center text-[10px] text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                        {order.customer_name?.[0] || '?'}
                     </div>
                     <div>
                        <div className="text-sm font-bold opacity-90">{order.customer_name || 'Anonyme'}</div>
                        <div className="text-[10px] text-[#555] font-mono mt-0.5">{new Date(order.created_at).toLocaleString('fr-FR')}</div>
                     </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="text-sm font-black text-[#d4af37] tracking-tight">+{Number(order.total).toFixed(2)} €</div>
                    <div className="text-[8px] uppercase tracking-tighter text-[#333] group-hover:text-[#555]">Ordre: {order.paypal_order_id?.slice(-8)}</div>
                  </div>
                </div>
              )) : (
                <div className="text-xs text-center py-10 text-[#555]">Aucune commande récente</div>
              )}
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-2xl p-8 transition-all hover:border-[#333]">
            <h3 className="text-sm font-semibold mb-6 text-[#888] uppercase tracking-widest border-b border-[#222] pb-3">Stock critique ({urgent.outOfStock.length + urgent.lowStock.length})</h3>
            <div className="space-y-4">
              {urgent.outOfStock.map(p => (
                 <StockAlertItem key={p.id} name={p.name} status="OUT" />
              ))}
              {urgent.lowStock.map(p => (
                 <StockAlertItem key={p.id} name={p.name} status="LOW" qty={(p.stock || 0) - (p.reserved_stock || 0)} />
              ))}
              {urgent.outOfStock.length === 0 && urgent.lowStock.length === 0 && (
                <div className="text-xs text-center text-[#555] py-8 border border-dashed border-[#222] rounded-xl flex items-center justify-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                   Inventaire impeccable ✅
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Analysis Section */}
        <section className="space-y-8">
          <SectionTitle title="📊 Analyse (7 jours)" />
          
          {/* Mini Chart Bonus */}
          <div className="bg-[#141414] border border-[#222] rounded-2xl p-8 transition-all hover:border-[#333]">
            <h3 className="text-sm font-semibold mb-6 text-[#888] uppercase tracking-widest">Revenus quotidiens</h3>
            <div className="flex items-end justify-between h-32 gap-2 mt-4">
               {chartData.map(([day, val]) => {
                  const maxVal = Math.max(...chartData.map(d => d[1]), 100);
                  const height = (val / maxVal) * 100;
                  return (
                    <div key={day} className="flex flex-col items-center flex-1 group relative">
                       <div className="text-[8px] absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity bg-black px-1 rounded text-[#d4af37] transition-all">{val.toFixed(0)}€</div>
                       <div 
                         className="w-full bg-[#1a1a1a] border-t border-x border-[#d4af37]/10 rounded-t-sm group-hover:bg-[#d4af37]/30 transition-all duration-500"
                         style={{ height: `${Math.max(5, height)}%`, backgroundColor: height > 0 ? '#d4af3755' : '#111' }}
                       />
                       <span className="text-[10px] text-[#555] mt-2 uppercase">{day}</span>
                    </div>
                  );
               })}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 transition-all hover:border-[#333]">
              <h3 className="text-[10px] font-bold mb-4 text-[#d4af37] uppercase tracking-widest">Top Volumes (Ventes)</h3>
              <div className="space-y-3">
                {topProducts.sortedByQty.map(([name, stats]) => (
                  <div key={name} className="flex justify-between items-center text-xs">
                    <span className="truncate pr-4 opacity-70 italic">{name}</span>
                    <span className="font-bold whitespace-nowrap bg-black/40 px-2 py-0.5 rounded border border-[#222]">{stats.qty} ex.</span>
                  </div>
                ))}
                {topProducts.sortedByQty.length === 0 && <div className="text-[10px] text-[#333]">Aucune donnée</div>}
              </div>
            </div>

            <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 transition-all hover:border-[#333] border-l-4 border-l-[#d4af37]">
              <h3 className="text-[10px] font-bold mb-4 text-[#d4af37] uppercase tracking-widest">Top Chiffre d'Affaires</h3>
              <div className="space-y-3">
                {topProducts.sortedByRev.map(([name, stats]) => (
                  <div key={name} className="flex justify-between items-center text-xs">
                    <span className="truncate pr-4 opacity-70 italic">{name}</span>
                    <span className="font-bold whitespace-nowrap text-[#d4af37]">{stats.rev.toFixed(2)} €</span>
                  </div>
                ))}
                {topProducts.sortedByRev.length === 0 && <div className="text-[10px] text-[#333]">Aucune donnée</div>}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Analytics Section */}
      <section className="mt-12 pt-12 border-t border-[#222]">
        <SectionTitle title="🌐 Suivi & Analytics" />
        <div className="flex flex-wrap gap-6 mt-4">
          <a 
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sacred !m-0 !min-w-[240px]"
          >
            <span className="btn-label">Google Analytics</span>
            <div className="btn-aura"></div>
          </a>
          <a 
            href="https://clarity.microsoft.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sacred !m-0 !min-w-[240px]"
          >
            <span className="btn-label">Microsoft Clarity</span>
            <div className="btn-aura"></div>
          </a>
        </div>
      </section>

    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-lg font-bold tracking-tight text-white mb-6 pl-2 border-l-2 border-[#d4af37]">{title}</h2>;
}

function KPICard({ label, value, suffix, color }: { label: string, value: string | number, suffix?: string, color?: string }) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-2xl p-8 transition-all hover:border-[#333] shadow-lg shadow-black/50">
      <div className="text-[0.8rem] text-[#888] uppercase tracking-wider font-semibold opacity-70 mb-3">{label}</div>
      <div className="text-[2.5rem] font-bold text-[#d4af37]" style={{ color: color }}>{value}<span className="text-sm font-normal ml-1 opacity-50">{suffix}</span></div>
    </div>
  );
}

function StockAlertItem({ name, status, qty }: { name: string, status: 'OUT' | 'LOW', qty?: number }) {
  return (
    <div className={`flex justify-between items-center p-4 rounded-xl border ${status === 'OUT' ? 'bg-red-950/20 border-red-900/30 text-red-400' : 'bg-orange-950/10 border-orange-900/20 text-orange-400'}`}>
      <span className="text-xs font-medium truncate pr-4">{name}</span>
      <span className={`text-[10px] font-black px-2 py-1 rounded bg-black/40 uppercase tracking-tighter`}>
        {status === 'OUT' ? '⚠️ RUPTURE' : `${qty} restants`}
      </span>
    </div>
  );
}
