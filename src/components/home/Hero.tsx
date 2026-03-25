'use client';

import './Hero.css';

interface HeroProps {
  dict: any;
}

export default function Hero({ dict }: HeroProps) {
  if (!dict) return null;

  return (
    <section className="hero" style={{ 
      /* Valeurs premium forgées par le client via l'ancienne télécommande */
      '--tapisserie-luminosite': '65%',
      '--tapisserie-opacite': '0.45',
      '--tapisserie-saturation': '500%'
    } as React.CSSProperties}>
      
      {/* Tapisserie Vivante 4.0 : 6 zones fixes asynchrones, respiration pure sans mouvement */}
      <div className="hero-texture-layer">
        <div className="bg-spot bg-spot-1"></div>
        <div className="bg-spot bg-spot-2"></div>
        <div className="bg-spot bg-spot-3"></div>
        <div className="bg-spot bg-spot-4"></div>
        <div className="bg-spot bg-spot-5"></div>
        <div className="bg-spot bg-spot-6"></div>
      </div>
      
      <div className="hero-grid-container">
        
        {/* TEXT CONTENT (À GAUCHE MÊME SUR MOBILE) */}
        <div className="hero-content left-content">
          <span className="hero-label-top">{dict.label}</span>
          
          <h1 className="hero-title">{dict.title}</h1>
          
          <div className="hero-subtitle-block">
            <div className="subtitle-bar"></div>
            <p className="hero-subtitle-text">
              {(() => {
                const words = dict.subtitle.split(' ');
                const half = Math.ceil(words.length / 2);
                const part1 = words.slice(0, half).join(' ');
                const part2 = words.slice(half).join(' ');
                return (
                  <>
                    <span style={{ color: 'var(--ivory)' }}>{part1}</span>{' '}
                    <span style={{ color: 'var(--turquoise)' }}>{part2}</span>
                  </>
                );
              })()}
            </p>
          </div>
          
          <p className="hero-description">{dict.description}</p>
        </div>

        {/* VISUAL COMPONENT (À DROITE MÊME SUR MOBILE) */}
        <div className="hero-visual right-visual">
          <div className="talisman-box">
             <div className="talisman-glow"></div>
             <img 
               src="/images/talisman.webp" 
               alt="Sacred Talisman" 
               className="hero-talisman animated"
             />
          </div>
        </div>

      </div>
    </section>
  );
}
