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
            <div className="footer-social-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '1.5rem' }}>
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
                Instagram
              </a>
              <a
                href="https://pinterest.com/apsaratemple"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                aria-label="Pinterest APSARA TEMPLE"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.67 7.91 6.46 9.38-.08-.8-.16-2.02.04-2.88.18-.78 1.16-4.92 1.16-4.92s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24.99.49 1.8 1.47 1.8 1.76 0 3.12-1.85 3.12-4.52 0-2.36-1.7-4.01-4.11-4.01-2.8 0-4.44 2.1-4.44 4.26 0 .85.33 1.76.73 2.25.08.1.09.19.07.29-.08.31-.25 1.02-.29 1.16-.05.18-.16.22-.37.12-1.38-.64-2.25-2.67-2.25-4.3 0-3.5 2.54-6.72 7.34-6.72 3.85 0 6.84 2.75 6.84 6.41 0 3.83-2.41 6.91-5.76 6.91-1.12 0-2.18-.58-2.54-1.27 0 0-.56 2.12-.69 2.65-.25.96-.92 2.16-1.37 2.89C10.22 21.84 11.09 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" stroke="none"/>
                </svg>
                Pinterest
              </a>
              <a
                href="https://facebook.com/apsaratemple"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                aria-label="Facebook APSARA TEMPLE"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
            </div>
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

