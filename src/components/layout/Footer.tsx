import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
           <div className="footer-brand">
             <div className="footer-logo">APSARA <span className="text-accent-turquoise">TEMPLE</span></div>
             <p className="footer-tagline">Preserving Ancient Wisdom Since 1904</p>
             <div className="footer-ornament-line"></div>
           </div>
           
           <div className="footer-nav">
             <div className="footer-col">
               <h4>The Temple</h4>
               <a href="/about">About Us</a>
               <a href="/rituals">Our Rituals</a>
               <a href="/locations">Shrines</a>
             </div>
             <div className="footer-col spacer-col">
                <div className="vertical-decorative-line"></div>
             </div>
             <div className="footer-col">
               <h4>The Relics</h4>
               <a href="/talismans">Talismans</a>
               <a href="/bracelets">Bracelets</a>
               <a href="/journal">The Journal</a>
             </div>
           </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 APSARA TEMPLE. Crafted for the Modern Seeker.</p>
          <div className="footer-socials">
             <a href="#">Instagram</a>
             <a href="#">Journal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
