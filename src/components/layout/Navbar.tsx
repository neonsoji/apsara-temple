'use client';

import { useState } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Talismans', href: '/talismans' },
  { name: 'Bracelets', href: '/bracelets' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`navbar ${isOpen ? 'is-open' : ''}`}>
        <div className="navbar-container">
          {/* Left Navigation */}
          <div className="navbar-links">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="nav-item">{link.name}</a>
            ))}
          </div>

          {/* Center Logo */}
          <div className="navbar-logo">
            <a href="/" style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               <div className="nav-logo-glow"></div>
               <img src="/images/logo01.svg" alt="APSARA TEMPLE" className="nav-logo-img" />
             </a>
          </div>

          {/* Right Icons (Shop functionality) */}
          <div className="navbar-icons">
            <button className="icon-btn search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="icon-btn cart-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1h4l2.7 12.5A2 2 0 0 0 9.7 15h9.6a2 2 0 0 0 2-1.5L23 6H6" />
              </svg>
            </button>
            
            <button 
              className={`mobile-toggle ${isOpen ? 'is-active' : ''}`} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <div className="toggle-line"></div>
              <div className="toggle-line short"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu-overlay ${isOpen ? 'show' : ''}`}>
          <div className="mobile-menu-content">
            {NAV_LINKS.map((link, index) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="mobile-nav-link"
                style={{ transitionDelay: `${index * 0.1}s` }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
      {isOpen && <div className="navbar-dimmer" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
