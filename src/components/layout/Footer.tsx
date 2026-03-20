import './Footer.css';
import Link from 'next/link';

interface FooterProps {
  dict: any;
}

export default function Footer({ dict }: FooterProps) {
  if (!dict) return null;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              APSARA <span className="text-accent-turquoise">TEMPLE</span>
            </div>
            <p className="footer-tagline">{dict.tagline}</p>
            <div className="footer-ornament"></div>
          </div>
          
          <div className="footer-nav">
            <div className="footer-col">
              <h4 className="footer-h4">{dict.col1}</h4>
              <Link href="/about" className="footer-link">{dict.links.rituals}</Link>
              <Link href="/rituals" className="footer-link">{dict.links.shrines}</Link>
              <Link href="/locations" className="footer-link">{dict.links.journal}</Link>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-h4">{dict.col2}</h4>
              <Link href="/talismans" className="footer-link">Talismans</Link>
              <Link href="/bracelets" className="footer-link">Bracelets</Link>
              <Link href="/journal" className="footer-link">Journal</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copy">{dict.copyright}</p>
          <div className="footer-socials">
            <a href="https://instagram.com/apsaratemple" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
