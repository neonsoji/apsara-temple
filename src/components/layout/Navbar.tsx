'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Navbar.css';

interface NavbarProps {
  locale: string;
  dict: any;
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSigil, setActiveSigil] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Déclenchement sur mobile (click) pour forcer l'affichage 2 secondes
  const handleSigilTap = (src: string) => {
    setActiveSigil(src);
    setTimeout(() => setActiveSigil(null), 2000);
  };

  if (!dict) return null;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* === MOBILE NAV BLOCKS === */}
        <div className="navbar-left-mobile">
          <button 
            className="icon-btn" aria-label="Menu"
            onMouseEnter={() => setActiveSigil('/images/menu.svg')}
            onMouseLeave={() => setActiveSigil(null)}
            onClick={() => handleSigilTap('/images/menu.svg')}
          >
             <img src="/images/menu.svg" alt="" className="nav-icon-svg" />
          </button>
          <button 
            className="icon-btn" aria-label="Search"
            onMouseEnter={() => setActiveSigil('/images/loupe.svg')}
            onMouseLeave={() => setActiveSigil(null)}
            onClick={() => handleSigilTap('/images/loupe.svg')}
          >
             <img src="/images/loupe.svg" alt="" className="nav-icon-svg icon-loupe" />
          </button>
        </div>

        <div className="navbar-right-mobile">
          <button 
            className="icon-btn" aria-label="Account"
            onMouseEnter={() => setActiveSigil('/images/compte.svg')}
            onMouseLeave={() => setActiveSigil(null)}
            onClick={() => handleSigilTap('/images/compte.svg')}
          >
             <img src="/images/compte.svg" alt="" className="nav-icon-svg" />
          </button>
          <button 
            className="icon-btn" aria-label="Cart"
            onMouseEnter={() => setActiveSigil('/images/panier.svg')}
            onMouseLeave={() => setActiveSigil(null)}
            onClick={() => handleSigilTap('/images/panier.svg')}
          >
             <img src="/images/panier.svg" alt="" className="nav-icon-svg" />
          </button>
        </div>

        {/* === DESKTOP NAV BLOCKS === */}
        <div className="navbar-left-desktop">
          <Link href={`/${locale}/talismans`} className="nav-item">
            {dict.talismans}
          </Link>
          <Link href={`/${locale}/bracelets`} className="nav-item">
            {dict.bracelets}
          </Link>
        </div>

        <div className="navbar-right-desktop">
          <div className="lang-switcher">
            <Link href="/fr" className={locale === 'fr' ? 'active' : ''} locale="fr">FR</Link>
            <span className="lang-pipe">|</span>
            <Link href="/en" className={locale === 'en' ? 'active' : ''} locale="en">EN</Link>
          </div>
          <Link href={`/${locale}/search`} className="nav-item">
            {dict.search || "RECHERCHE"}
          </Link>
          <Link href={`/${locale}/account`} className="nav-item">
            {dict.account || "COMPTE"}
          </Link>
          <Link href={`/${locale}/cart`} className="nav-item">
            {dict.cart || "PANIER (0)"}
          </Link>
        </div>

        {/* === CENTER LOGO (Absolute) === */}
        <div className="navbar-logo-absolute">
          <Link href={`/${locale}`}>
            <div className="nav-logo-glow"></div>
            <img 
              src="/images/logo01.svg" 
              alt="APSARA TEMPLE" 
              className="nav-logo-img"
            />
          </Link>
        </div>

      </div>

      {/* === MAGICAL CENTRAL PROJECTION === */}
      <div className={`sigil-projection ${activeSigil ? 'active' : ''}`}>
        {activeSigil && <img src={activeSigil} alt="" className="sigil-projection-img" />}
      </div>
    </nav>
  );
}
