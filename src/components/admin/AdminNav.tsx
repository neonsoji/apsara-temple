'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface AdminNavProps {
  locale: string;
}

export default function AdminNav({ locale }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      name: 'Dashboard',
      href: `/${locale}/admin/dashboard`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      )
    },
    {
      name: 'Stock',
      href: `/${locale}/admin/stock`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      )
    }
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  };

  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-lg border ${
              isActive 
                ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                : 'bg-transparent text-[#888] border-[#222] hover:border-[#333] hover:text-white'
            }`}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.name}</span>
          </Link>
        );
      })}
      
      {/* Logout Action */}
      <button
        onClick={handleLogout}
        className="ml-2 p-2 text-[#444] hover:text-red-500 transition-colors"
        title="Déconnexion"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </nav>
  );
}
