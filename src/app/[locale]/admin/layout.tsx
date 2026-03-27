import React from 'react';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <div className="admin-container min-h-screen bg-[#070707] text-[#e5e5e5] w-full flex flex-col items-center">
      {/* 
          WRAPPER PRINCIPAL 
          On force une marge à gauche massive directement via style pour éviter tout problème de cache Tailwind.
          On retire max-w pour laisser la marge s'exprimer pleinement si besoin.
      */}
      <div 
        className="w-full max-w-5xl py-12" 
        style={{ paddingLeft: '80px', paddingRight: '40px' }}
      >
        
        {/* Header - Aligné sur le contenu */}
        <header className="flex items-center justify-between border-b border-[#1a1a1a] pb-12">
          <Link 
            href={`/${locale}/admin/dashboard`} 
            className="flex items-center gap-4 group transition-opacity hover:opacity-80"
          >
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#000] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <span className="text-xs font-serif text-[#d4af37]">AT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#d4af37]">Apsara Temple</span>
              <span className="text-[10px] uppercase tracking-widest text-[#555] -mt-1 font-serif italic">Cockpit Admin</span>
            </div>
          </Link>
          
          <AdminNav locale={locale} />
        </header>

        {/* Main Content Area */}
        <main className="py-12 md:py-20 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {children}
        </main>

      </div>

      {/* Subtle Bottom Accent */}
      <div className="fixed bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent pointer-events-none" />
    </div>
  );
}
