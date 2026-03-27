'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const { locale } = await params;
        router.push(`/${locale}/admin/dashboard`);
        router.refresh();
      } else {
        const { error: err } = await res.json();
        setError(err || 'Mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in duration-1000">
      <div className="w-full max-w-sm space-y-8 bg-[#0a0a0a] border border-[#d4af37]/20 p-8 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.05)]">
        
        {/* Logo Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-14 h-14 rounded-full border border-[#d4af37]/30 items-center justify-center bg-gradient-to-br from-[#111] to-[#000] mb-2">
            <span className="text-sm font-serif text-[#d4af37]">AT</span>
          </div>
          <h1 className="text-xl font-bold tracking-[.3em] uppercase text-[#d4af37]">Cockpit</h1>
          <p className="text-[10px] text-[#555] uppercase tracking-widest font-serif italic">Accès restreint — Authentification requise</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe admin"
              autoFocus
              className="w-full bg-[#111] border border-[#222] rounded-xl px-5 py-4 text-center text-sm focus:outline-none focus:border-[#d4af37] transition-all placeholder:text-[#333] tracking-[.5em]"
            />
            {error && <p className="text-[10px] text-red-500 text-center font-bold uppercase tracking-widest bg-red-950/20 py-2 rounded-lg">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-bold py-4 rounded-xl text-xs uppercase tracking-[.2em] transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Validation...' : 'Déverrouiller'}
          </button>
        </form>

        <div className="pt-4 text-center">
           <a href="/" className="text-[9px] text-[#444] hover:text-[#d4af37] transition-colors uppercase tracking-widest">Retourner à la boutique</a>
        </div>
      </div>
    </div>
  );
}
