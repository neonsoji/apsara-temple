'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import './Navbar.css';

interface NavbarProps {
  locale: string;
  dict: any;
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSigil, setActiveSigil] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu si on change de route (clic sur lien)
  const closeMenu = () => setIsMenuOpen(false);

  // Déclenchement sur mobile (click) pour forcer l'affichage 2 secondes
  const handleSigilTap = (src: string) => {
    setActiveSigil(src);
    setTimeout(() => setActiveSigil(null), 2000);
  };

  if (!dict) return null;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="navbar-container">
          
          {/* === MOBILE NAV BLOCKS === */}
          <div className="navbar-left-mobile">
            <button 
              className={`icon-btn menu-toggle ${isMenuOpen ? 'active' : ''}`} 
              aria-label="Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={() => setActiveSigil('/images/menu.svg')}
              onMouseLeave={() => setActiveSigil(null)}
            >
               <img src="/images/menu.svg" alt="" className={`nav-icon-svg ${isMenuOpen ? "open" : ""}`} />
            </button>
            <Link 
              href={`/${locale}/search`}
              className="icon-btn search-toggle" aria-label="Search"
              onClick={closeMenu}
              onMouseEnter={() => setActiveSigil('/images/loupe.svg')}
              onMouseLeave={() => setActiveSigil(null)}
            >
               <img src="/images/loupe.svg" alt="" className="nav-icon-svg icon-loupe" />
            </Link>
          </div>

          <div className="navbar-right-mobile">
            <Link 
              href={`/${locale}/account`}
              className="icon-btn" aria-label="Account"
              onClick={closeMenu}
              onMouseEnter={() => setActiveSigil('/images/compte.svg')}
              onMouseLeave={() => setActiveSigil(null)}
            >
               <img src="/images/compte.svg" alt="" className={`nav-icon-svg ${isMenuOpen ? "open" : ""}`} />
            </Link>
            <Link 
              href={`/${locale}/cart`}
              className="icon-btn" aria-label="Cart"
              onClick={closeMenu}
              onMouseEnter={() => setActiveSigil('/images/panier.svg')}
              onMouseLeave={() => setActiveSigil(null)}
            >
               <img src="/images/panier.svg" alt="" className={`nav-icon-svg ${isMenuOpen ? "open" : ""}`} />
               {totalItems > 0 && (
                 <div className="cart-dots-container">
                   <span className="cart-dot" />
                 </div>
               )}
            </Link>
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
              <Link href="/fr" className={locale === 'fr' ? 'active' : ''}>FR</Link>
              <span className="lang-pipe">|</span>
              <Link href="/en" className={locale === 'en' ? 'active' : ''}>EN</Link>
            </div>
            <Link href={`/${locale}/search`} className="nav-item">
              {dict.search || "RECHERCHE"}
            </Link>
            <Link href={`/${locale}/account`} className="nav-item">
              {dict.account || "COMPTE"}
            </Link>
            <Link href={`/${locale}/cart`} className="nav-item">
              {dict.cart || "PANIER"} ({totalItems})
            </Link>
          </div>

          {/* === CENTER LOGO (Absolute) === */}
          <div className="navbar-logo-absolute">
            <Link href={`/${locale}`} onClick={closeMenu}>
              <div className="nav-logo-glow"></div>
              <Image 
                src="/images/logo01.svg" 
                alt="APSARA TEMPLE — Sanctuaire de Reliques Sacrées" 
                width={180}
                height={40}
                priority
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

      {/* === MOBILE OVERLAY MENU === */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-background-texture"></div>
        <div className="menu-content-sacred">
          <div className="menu-ornament-top">✧ ✦ ✧</div>
          <nav className="menu-links">
            <Link href={`/${locale}`} className="menu-link" onClick={closeMenu}>
              <span className="link-num">01</span> {locale === 'fr' ? 'Demeure' : 'Abode'}
            </Link>
            <Link href={`/${locale}/talismans`} className="menu-link" onClick={closeMenu}>
               <span className="link-num">02</span> {dict.talismans}
            </Link>
            <Link href={`/${locale}/bracelets`} className="menu-link" onClick={closeMenu}>
               <span className="link-num">03</span> {dict.bracelets}
            </Link>
            <Link href={`/${locale}/journal`} className="menu-link" onClick={closeMenu}>
               <span className="link-num">04</span> {locale === 'fr' ? 'Le Journal' : 'The Journal'}
            </Link>
            <Link href={`/${locale}/about`} className="menu-link" onClick={closeMenu}>
               <span className="link-num">05</span> {locale === 'fr' ? "L'Origine" : 'The Origin'}
            </Link>
            <Link href={`/${locale}/contact`} className="menu-link" onClick={closeMenu}>
               <span className="link-num">06</span> Contact
            </Link>
          </nav>
          
          <div className="menu-footer">
            <div className="menu-lang-switcher">
              <Link href="/fr" className={locale === 'fr' ? 'active' : ''} onClick={closeMenu}>FR</Link>
              <span>|</span>
              <Link href="/en" className={locale === 'en' ? 'active' : ''} onClick={closeMenu}>EN</Link>
            </div>
            <p className="menu-motto">APSARA TEMPLE — Éveil & Protection</p>
          </div>
        </div>
      </div>
    </>
  );
}


