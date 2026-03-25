import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './ProductDetail.css';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: `${dict.products.shunyata.name} | ${dict.hero.title}`,
    description: dict.products.shunyata.intro,
  };
}

export default async function ShunyataProductPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Sutra of the Silent Heart - Heart Sutra Buddha Pendant | APSARA TEMPLE",
    "image": "https://apsara-temple.com/images/products/pendentifs/pendentif-bouddha-sutra-coeur-rotatif-protection.png",
    "description": dict.products.shunyata.intro,
    "brand": {
      "@type": "Brand",
      "name": "APSARA TEMPLE"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://apsara-temple.com/${locale}/products/sutra-of-the-silent-heart`,
      "priceCurrency": "EUR",
      "price": "185",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="product-page-container">
      <Navbar locale={locale} dict={dict.navigation} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO SHOT SECTION */}
      <section className="product-hero">
        <div className="product-hero-mist"></div>
        
        <div className="product-hero-layout">
          {/* Visual Presentation */}
          <div className="product-visual-pane">
            <div className="main-image-wrapper">
              <div className="image-aura"></div>
              <Image 
                src="/images/products/pendentifs/pendentif-bouddha-sutra-coeur-rotatif-protection.png" 
                alt={dict.products.shunyata.name} 
                className="main-product-image"
                width={600}
                height={750}
                priority
              />
            </div>
          </div>

          {/* Core Info Pane */}
          <div className="product-info-pane">
            <div className="product-badge">{dict.products.available}</div>
            <h1 className="product-title-lux">{dict.products.shunyata.name}</h1>
            
            <div className="price-tag">185€</div>
            
            <div className="product-intro">
               <p>{dict.products.shunyata.intro}</p>
            </div>
            
            <div className="product-actions">
              <button className="btn-add-to-relics">
                <span className="btn-label">{dict.products.claim}</span>
                <span className="btn-aura"></span>
              </button>
              <p className="stock-notice">{dict.products.ritual_notice}</p>
            </div>
            
            <div className="quick-specs">
               <div className="spec-item">
                  <span className="spec-label">{dict.products.specs.material}</span>
                  <span className="spec-value">{dict.products.specs.material_val}</span>
               </div>
               <div className="spec-item">
                  <span className="spec-label">{dict.products.specs.mechanism}</span>
                  <span className="spec-value">{dict.products.specs.mechanism_val}</span>
               </div>
               <div className="spec-item">
                  <span className="spec-label">{dict.products.specs.protection}</span>
                  <span className="spec-value">{dict.products.specs.protection_val}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORYTELLING SECTION: THE MEANING */}
      <section className="product-story section-dark">
        <div className="story-glow"></div>
        <div className="content-narrow">
          <div className="ornament-divider">✧</div>
          <h2 className="story-heading">{dict.products.shunyata.story.title}</h2>
          <p className="story-body">
            {dict.products.shunyata.story.body}
          </p>
          <div className="story-detail-grid">
             <div className="detail-box">
                <h3>{dict.products.shunyata.story.core_title}</h3>
                <p>{dict.products.shunyata.story.core_body}</p>
             </div>
             <div className="detail-box">
                <h3>{dict.products.shunyata.story.presence_title}</h3>
                <p>{dict.products.shunyata.story.presence_body}</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. BULLETS & TRUST */}
      <section className="product-features">
        <div className="features-container">
           <ul className="premium-bullets">
             {dict.products.shunyata.features.map((feature: string, idx: number) => (
               <li key={idx} dangerouslySetInnerHTML={{ __html: feature }}></li>
             ))}
           </ul>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="product-faq">
        <div className="content-narrow">
          <h2 className="section-title-small">{dict.products.shunyata.faq.title}</h2>
          <div className="faq-grid">
            {dict.products.shunyata.faq.items.map((item: any, idx: number) => (
              <div className="faq-item" key={idx}>
                <h4>{item.q}</h4>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer dict={dict.footer} />
    </div>
  );
}
