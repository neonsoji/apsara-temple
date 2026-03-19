import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      {/* Decorative Hero Background Elements */}
      <div className="hero-atmosphere">
        <div className="smoke-element left"></div>
        <div className="smoke-element right"></div>
        <div className="floating-particles"></div>
      </div>

      <div className="hero-grid-container">
        {/* LEFT = Text Content with Atmosphere */}
        <div className="hero-column left-content">
          <div className="text-highlight-glow"></div>
          <div className="hero-text-wrapper">
            <span className="hero-label">Sacred Arts</span>
            <h1 className="hero-title">APSARA TEMPLE</h1>
            <p className="hero-subtitle">Sacred talismans of protection</p>
            <p className="hero-description">
              Forged from ancient rituals and forgotten traditions. 
              Each object is a vessel of intention, crafted for the modern seeker 
              to guard the spiritual path and manifest sacred harmony.
            </p>
            <div className="hero-action-hint">
               <span className="scroll-indicator">Explore the relics</span>
               <div className="scroll-line"></div>
            </div>
          </div>
        </div>

        {/* RIGHT = The "Alive" Talisman with Mystical Energy */}
        <div className="hero-column right-visual">
          <div className="talisman-presentation-box">
             {/* Mystical Energy Glows & Integration */}
             <div className="talisman-glow-core"></div>
             <div className="talisman-aura"></div>
             <div className="turquoise-ambient-pulse"></div>
             <div className="gold-talisman-highlight"></div>
             <div className="talisman-dust-particles"></div>
             
             <div className="hero-talisman-container">
                <img 
                  src="/images/talisman.webp" 
                  alt="Sacred Talisman" 
                  className="hero-talisman animated-talisman"
                />
             </div>
             
             {/* Dynamic shadows & depth */}
             <div className="talisman-shadow-base"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
