import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/product/AddToCartButton";
import './ProductDetail.css';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale, slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const name = product.names[locale];
  const description = product.descriptions[locale];

  return (
    <div className="product-page-container">
      <Navbar locale={locale} dict={dict.navigation} />
      
      {/* 1. HERO SHOT SECTION (RESTAURÉ VIA GIT) */}
      <section className="product-hero">
        <div className="product-hero-mist"></div>
        
        <div className="product-hero-layout">
          {/* Visual Presentation */}
          <div className="product-visual-pane">
            <div className="main-image-wrapper">
              <div className="image-aura"></div>
              <img 
                src={product.image} 
                alt={name} 
                className="main-product-image"
              />
            </div>
          </div>

          {/* Core Info Pane */}
          <div className="product-info-pane">
            <div className="product-badge">{locale === 'fr' ? 'RELIQUE DISPONIBLE' : 'RELIC AVAILABLE'}</div>
            <h1 className="product-title-lux">{name}</h1>
            
            <div className="price-tag">{product.price}</div>
            
            <div className="product-intro">
               <p>{description}</p>
            </div>
            
            <div className="product-actions">
              <AddToCartButton 
                product={product} 
                label={locale === 'fr' ? "S'UNIR À CETTE RELIQUE" : "JOIN WITH THIS RELIC"} 
              />
              <div style={{ marginTop: '1.5rem', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ivory)', opacity: 0.35, textAlign: 'center' }}>
                {locale === 'fr' ? 'EXPÉDITION RITUELLE SOUS 48H' : 'RITUAL SHIPPING WITHIN 48H'}
              </div>
            </div>
            
            <div className="quick-specs" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid rgba(253, 250, 241, 0.1)', paddingTop: '2rem' }}>
               <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="spec-label" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>{locale === 'fr' ? 'Matière' : 'Material'}</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{product.details?.material[locale]}</span>
               </div>
               <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="spec-label" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>Dimensions</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{product.details?.size[locale]}</span>
               </div>
               <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="spec-label" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>Protection</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{product.details?.protection[locale]}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORYTELLING SECTION: THE MEANING (RESTAURÉ VIA GIT) */}
      <section className="product-story section-dark" style={{ padding: '120px 8%', background: 'rgba(13,0,0,0.4)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
        <div className="story-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '600px', background: 'radial-gradient(circle, rgba(105, 5, 5, 0.1) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: -1 }}></div>
        <div className="content-narrow" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="ornament-divider" style={{ marginBottom: '2rem', color: 'var(--turquoise)', fontSize: '1.5rem' }}>✧</div>
          <h2 className="story-heading" style={{ fontSize: '3rem', marginBottom: '2rem', fontFamily: 'var(--font-cinzel), serif' }}>LA SIGNIFICATION</h2>
          <p className="story-body" style={{ fontSize: '1.25rem', lineHeight: 2, marginBottom: '5rem', opacity: 0.8, fontFamily: 'var(--font-playfair), serif' }}>
            Chaque relique d'APSARA TEMPLE est plus qu'un simple objet. C'est un vaisseau d'intention, forgé pour accompagner le chercheur moderne dans sa quête d'équilibre et de protection.
          </p>
        </div>
      </section>

      {/* 3. BULLETS & TRUST */}
      <section className="product-features" style={{ padding: '80px 8%' }}>
        <div className="features-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
           <ul className="premium-bullets" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>Finition artisanale haute joaillerie</li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>Livré dans son écrin de velours</li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>Certificat d'authenticité spirituelle</li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>Ritualisé avant expédition</li>
           </ul>
        </div>
      </section>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
