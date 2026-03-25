import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './About.css';

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="about-page-container">
      <Navbar locale={locale} dict={dict.navigation} />
      
      <section className="about-hero">
        <div className="about-mist"></div>
        <div className="about-content">
          <h1 className="about-title title-sacred">LA GENÈSE D'APSARA</h1>
          <p className="about-subtitle">Préserver la sagesse ancestrale dans un monde en mouvement.</p>
        </div>
      </section>

      <section className="about-story-section">
        <div className="story-image-decoration">
           <img src="/images/apsara-hero-bg.webp" alt="Temple Atmosphere" />
        </div>
        
        <div className="story-text-content">
          <div className="ornament">✧</div>
          <h2>NOTRE MISSION</h2>
          <p>
            APSARA TEMPLE est né d'une volonté simple mais profonde : reconnecter l'humain moderne à la puissance protectrice des symboles anciens. Dans un monde de plus en plus virtuel, nous croyons au poids du métal, à l'imperfection artisanale et à la vibration du rituel.
          </p>
          <p>
            Chaque relique que nous forgeons est inspirée de découvertes archéologiques, de géométrie sacrée et de traditions spirituelles millénaires—du bouddhisme d'Asie centrale aux mystères du Sud-Est asiatique.
          </p>
          
          <div className="ornament" style={{ marginTop: '4rem' }}>✧</div>
          <h2>L'ARTISANAT DU SACRÉ</h2>
          <p>
            Nous ne créons pas de simples bijoux. Nous créons des ancres. Nos pièces sont finies à la main, patinées pour suggérer le passage du temps, et chargées d'intention avant de quitter notre sanctuaire pour rejoindre leur futur porteur.
          </p>
        </div>
      </section>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
