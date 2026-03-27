import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { getProductBySlug } from "@/services/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import './ProductDetail.css';

// 🚀 DÉSACTIVE TOUT CACHE POUR UNE SOURCE UNIQUE TEMPS RÉEL
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
     return { title: 'Produit non trouvé' };
  }

  const name = locale === 'en' ? (product.name_en || product.name) : product.name;
  const desc = locale === 'en' ? (product.description_en || product.description) : product.description;
  const mainImage = product.image || '/placeholder.png';

  return {
    title: `${name} | APSARA TEMPLE`,
    description: desc.substring(0, 160) + "...",
    openGraph: {
      title: `${name} | APSARA TEMPLE`,
      description: desc.substring(0, 160) + "...",
      images: [{ url: mainImage, width: 800, height: 800, alt: name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale, slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  
  // 🧱 FETCH DIRECT DEPUIS SUPABASE (Bypass tout lien local)
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  console.log('📦 PAGE PRODUIT — DONNÉE SUPABASE :', product.name, 'PRIX:', product.price);

  const name = locale === 'en' ? (product.name_en || product.name) : product.name;
  const desc = locale === 'en' ? (product.description_en || product.description) : product.description;
  const material = locale === 'en' ? (product.material_en || product.material_fr) : (product.material_fr || 'Alliage Sacré');
  const size = locale === 'en' ? (product.size_en || product.size_fr) : (product.size_fr || 'Taille unique');
  const protection = locale === 'en' ? (product.protection_en || product.protection_fr) : (product.protection_fr || 'Protection spirituelle');
  
  const galleryImages = [product.image || '/placeholder.png'];

  return (
    <div className="product-page-container">
      <Navbar locale={locale} dict={dict.navigation} />
      
      <section className="product-hero">
        <div className="product-hero-mist"></div>
        
        <div className="product-hero-layout">
          <div className="product-visual-pane">
            <ProductImageGallery images={galleryImages} alt={name} />
          </div>

          <div className="product-info-pane">
            <div className="product-badge">{locale === 'fr' ? 'RELIQUE DISPONIBLE' : 'RELIC AVAILABLE'}</div>
            <h1 className="product-title-lux">{name}</h1>
            
            <div className="price-tag">{product.price.toFixed(2)} €</div>
            
            <div className="product-intro">
               <p>
                 {locale === 'fr' 
                   ? "Chaque relique d'APSARA TEMPLE est plus qu'un simple objet. C'est un vaisseau d'intention, forgé pour accompagner le chercheur moderne dans sa quête d'équilibre et de protection."
                   : "Every relic from APSARA TEMPLE is more than a simple object. It is a vessel of intention, forged to accompany the modern seeker in their quest for balance and protection."}
               </p>
            </div>
            
            <div className="product-actions">
              <AddToCartButton 
                product={product as any} 
                label={locale === 'fr' ? "S'UNIR À CETTE RELIQUE" : "JOIN WITH THIS RELIC"} 
              />
              <div style={{ marginTop: '1.5rem', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ivory)', opacity: 0.35, textAlign: 'center' }}>
                {locale === 'fr' ? 'EXPÉDITION RITUELLE SOUS 48H' : 'RITUAL SHIPPING WITHIN 48H'}
              </div>
            </div>
            
            <div className="quick-specs" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid rgba(253, 250, 241, 0.1)', paddingTop: '2rem' }}>
               <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="spec-label" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>{locale === 'fr' ? 'Matière' : 'Material'}</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{material}</span>
               </div>
               <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="spec-label" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>Dimensions</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{size}</span>
               </div>
               <div className="spec-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="spec-label" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4 }}>Protection</span>
                  <span className="spec-value" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{protection}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-story section-dark" style={{ padding: '120px 8%', background: 'rgba(13,0,0,0.4)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
        <div className="story-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '600px', background: 'radial-gradient(circle, rgba(105, 5, 5, 0.1) 0%, transparent 60%)', filter: 'blur(100px)', zIndex: -1 }}></div>
        <div className="content-narrow" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div className="ornament-divider" style={{ marginBottom: '2rem', color: 'var(--turquoise)', fontSize: '1.5rem' }}>✧</div>
          <h2 className="story-heading" style={{ fontSize: '3rem', marginBottom: '2rem', fontFamily: 'var(--font-cinzel), serif' }}>
            {locale === 'fr' ? 'LA SIGNIFICATION' : 'THE MEANING'}
          </h2>
          <p className="story-body" style={{ fontSize: '1.25rem', lineHeight: 2, marginBottom: '5rem', opacity: 0.8, fontFamily: 'var(--font-playfair), serif' }}>
            {desc}
          </p>
        </div>
      </section>

      <section className="product-features" style={{ padding: '80px 8%' }}>
        <div className="features-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
           <ul className="premium-bullets" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>{locale === 'fr' ? 'Finition artisanale haute joaillerie' : 'High jewelry artisanal finish'}</li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>{locale === 'fr' ? 'Livré dans son écrin de velours' : 'Delivered in its velvet case'}</li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>{locale === 'fr' ? "Certificat d'authenticité spirituelle" : 'Certificate of spiritual authenticity'}</li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.7, paddingLeft: '2rem', position: 'relative' }}>{locale === 'fr' ? 'Ritualisé avant expédition' : 'Ritualized before shipping'}</li>
           </ul>
        </div>
      </section>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
