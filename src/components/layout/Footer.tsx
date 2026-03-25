import './Footer.css';
import Link from 'next/link';

interface FooterProps {
  dict: any;
  locale?: string;
}

export default function Footer({ dict, locale = 'fr' }: FooterProps) {
  if (!dict) return null;

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP : Brand + Navigation */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              APSARA <span className="text-accent-turquoise">TEMPLE</span>
            </div>
            <p className="footer-tagline">{dict.tagline}</p>
            <div className="footer-ornament" />
            <a
              href="https://instagram.com/apsaratemple"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-pill"
              aria-label="Instagram APSARA TEMPLE"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              @apsaratemple
            </a>
          </div>

          {/* Navigation */}
          <div className="footer-nav">

            <div className="footer-col">
              <h4 className="footer-h4">{dict.col1 || 'Le Temple'}</h4>
              <Link href={`/${locale}/journal`} className="footer-link">{dict.links?.journal || 'Le Journal'}</Link>
              <Link href={`/${locale}/talismans`} className="footer-link">Talismans</Link>
              <Link href={`/${locale}/bracelets`} className="footer-link">Bracelets</Link>
            </div>

            <div className="footer-col">
              <h4 className="footer-h4">Service Client</h4>
              <Link href={`/${locale}/livraison`} className="footer-link">Livraison & Retours</Link>
              <Link href={`/${locale}/contact`} className="footer-link">Contact</Link>
            </div>

            <div className="footer-col">
              <h4 className="footer-h4">Informations Légales</h4>
              <Link href={`/${locale}/mentions-legales`} className="footer-link">Mentions Légales</Link>
              <Link href={`/${locale}/cgv`} className="footer-link">CGV</Link>
              <Link href={`/${locale}/cgu`} className="footer-link">CGU</Link>
            </div>

          </div>
        </div>

        {/* BOTTOM : Copyright */}
        <div className="footer-bottom">
          <p className="footer-copy">{dict.copyright}</p>
          <div className="footer-bottom-links">
            <Link href={`/${locale}/mentions-legales`} className="footer-bottom-link">Mentions Légales</Link>
            <span className="footer-bottom-sep">·</span>
            <Link href={`/${locale}/cgv`} className="footer-bottom-link">CGV</Link>
            <span className="footer-bottom-sep">·</span>
            <Link href={`/${locale}/cgu`} className="footer-bottom-link">CGU</Link>
            <span className="footer-bottom-sep">·</span>
            <Link href={`/${locale}/livraison`} className="footer-bottom-link">Livraison</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

