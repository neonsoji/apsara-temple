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

  // SEO Optimized Title & Description
  const titleSuffix = " – Bracelet Feng Shui | APSARA TEMPLE";
  const seoTitle = `${name}${titleSuffix}`.slice(0, 60);
  const seoDesc = `${desc.substring(0, 140)}... Découvrez ce talisman protection et bijou spirituel unique.`.slice(0, 155);

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: `https://apsara-temple.com/${locale}/products/${slug}`,
      languages: {
        'fr': `https://apsara-temple.com/fr/products/${slug}`,
        'en': `https://apsara-temple.com/en/products/${slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      images: [{ url: mainImage, width: 800, height: 800, alt: `${name} — APSARA TEMPLE relique sacrée` }],
      url: `https://apsara-temple.com/${locale}/products/${slug}`,
      siteName: "APSARA TEMPLE",
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: [mainImage],
    }
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
  
  const isInStock = product.stock && product.stock > 0;
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
              <div className="product-shipping" style={{ marginBottom: '1.5rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ivory)', opacity: 0.8, textAlign: 'center' }}>
                {isInStock ? (
                  <span style={{ textShadow: '0 0 15px rgba(64, 224, 208, 0.4)' }}>
                    {locale === 'fr' ? 'Disponible immédiatement — expédition rituelle sous 48H' : 'Available immediately — ritual shipping within 48H'}
                  </span>
                ) : (
                  <span>
                    {locale === 'fr' ? 'Préparé à la demande — expédition rituelle sous 10 à 20 jours' : 'Made to order — ritual shipping within 10 to 20 days'}
                  </span>
                )}
              </div>
              <AddToCartButton 
                product={product as any} 
                label={locale === 'fr' ? "S'UNIR À CETTE RELIQUE" : "JOIN WITH THIS RELIC"} 
              />
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
            {locale === 'fr' ? 'La Signification du Talisman' : 'THE MEANING'}
          </h2>
          <p className="story-body" style={{ fontSize: '1.25rem', lineHeight: 2, marginBottom: '5rem', opacity: 0.8, fontFamily: 'var(--font-playfair), serif' }}>
            {desc}
          </p>
        </div>
      </section>

      {/* 🚀 SEO RICH CONTENT SECTION (800+ words target) */}
      <section className="product-seo-content" style={{ padding: '80px 8%', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))' }}>
        <div className="content-narrow" style={{ maxWidth: '950px', margin: '0 auto' }}>
          <article className="seo-rich-text" style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--ivory)', opacity: 0.9, lineHeight: '1.9' }}>
            
            <header className="seo-meta-titles" style={{ marginBottom: '4rem', textAlign: 'center' }}>
               <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#d4af37', fontFamily: 'var(--font-cinzel), serif' }}>{locale === 'fr' ? `Focus : Votre ${name} – Bracelet Feng Shui & Force` : `Focus: Your ${name} – Feng Shui Bracelet & Power`}</h2>
               <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.5 }}>{locale === 'fr' ? 'Le guide complet de votre talisman protection' : 'The complete guide to your protection talisman'}</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '4rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontFamily: 'var(--font-cinzel), serif', color: 'var(--turquoise)' }}>{locale === 'fr' ? 'Signification Profonde du Talisman' : 'Deep Meaning of the Talisman'}</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  {locale === 'fr' 
                    ? `Le ${name} incarne une alliance entre l’esthétique sacrée et la puissance brute de l’intention. Ce n'est pas simplement un bijou spirituel ; c'est une invitation à se reconnecter à l'essentiel. À travers chaque courbe et chaque matériau noble, ce talisman protection véhicule une vibration ancestrale, héritée des rituels de l'ASIE MYSTIQUE. En le portant, vous affirmez votre quête de sens et votre protection énergétique au quotidien.`
                    : `The ${name} embodies an alliance between sacred aesthetics and the raw power of intention. It is not simply a spiritual gemstone; it is an invitation to reconnect with the essential. Through every curve and noble material, this protection talisman conveys an ancestral vibration, inherited from the rituals of MYSTICAL ASIA.`}
                </p>
                <p>
                  {locale === 'fr'
                    ? `Porter un bracelet feng shui comme le ${name} signifie aligner son propre rythme sur celui de l'univers. La lithothérapie et le symbolisme sacrés se rejoignent ici pour offrir un bouclier contre les énergies stagnantes. Chaque élément a été sélectionné avec une rigueur rituelle, garantissant que votre relique conserve sa charge vibratoire longtemps après son acquisition.`
                    : `Wearing a feng shui bracelet like the ${name} means aligning your own rhythm with that of the universe.`}
                </p>
              </div>
              <div style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '1px border-dashed rgba(212,175,55,0.2)' }}>
                 <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontFamily: 'var(--font-cinzel), serif', color: '#d4af37' }}>{locale === 'fr' ? 'Énergie et Intention' : 'Energy and Intention'}</h3>
                 <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                   {locale === 'fr'
                     ? `L'activation du ${name} nécessite une intention pure. Chez APSARA TEMPLE, chaque bijou spirituel subit un cycle de purification pour libérer son plein potentiel. Que vous cherchiez l'abondance, la sérénité ou la force guerrière, ce talisman sera le miroir de votre volonté. En touchant les perles ou le médaillon, prenez un instant pour visualiser la lumière qui émane de votre plexus solaire.`
                     : `Activating the ${name} requires pure intention. At APSARA TEMPLE, every spiritual gemstone undergoes a cycle of purification to release its full potential.`}
                 </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-cinzel), serif', borderBottom: '1px solid #d4af37', paddingBottom: '0.5rem', display: 'inline-block' }}>{locale === 'fr' ? 'Comment utiliser ce Talisman au Quotidien' : 'How to Use This Talisman Daily'}</h3>
            <div style={{ marginBottom: '4rem' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                {locale === 'fr'
                  ? `Pour maximiser les bienfaits de votre bracelet feng shui, il est recommandé de le porter sur le poignet gauche, le côté du corps qui reçoit l'énergie. Lors de vos méditations, le ${name} peut servir de point focal, ancrant votre esprit dans le moment présent. Ce talisman protection agit en synergie avec vos propres centres énergétiques, amplifiant les courants positifs et dissolvant les blocages résiduels.`
                  : `To maximize the benefits of your feng shui bracelet, it is recommended to wear it on the left wrist. This side of the body is known as the receiving side.`}
              </p>
              <p>
                {locale === 'fr'
                  ? `Il est conseillé de retirer votre bijou spirituel avant de dormir pour permettre à ses énergies de se reposer, idéalement en le plaçant sur un amas de quartz ou un lit de gros sel purifié. Cette pratique de maintenance énergétique assure que votre talisman ${name} reste un allié puissant et clairvoyant. Ne laissez pas autrui toucher votre talisman, car il mémorise les vibrations de son porteur originel.`
                  : `It is advisable to remove your spiritual gemstone before sleeping to allow its energies to rest.`}
              </p>
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-cinzel), serif', textAlign: 'right', display: 'block' }}>{locale === 'fr' ? 'Symbolique Culturelle & Héritage' : 'Cultural Symbolism & Heritage'}</h3>
            <p style={{ textAlign: 'right', maxWidth: '700px', marginLeft: 'auto', marginBottom: '4rem' }}>
              {locale === 'fr'
                ? `Le design du ${name} s'inspire des géométries sacrées que l'on retrouve sur les frontons des temples d'Angkor. À travers ce bijou spirituel, nous rendons hommage aux APSARAS, ces divinités dansantes qui incarnent la grâce divine et la sagesse éthérée. Choisir APSARA TEMPLE, c'est choisir d'honorer une tradition millénaire tout en l'adaptant à la modernité. Ce talisman protection est le pont jeté entre le visible et l'invisible, entre votre quotidien et le sacré.`
                : `The design of the ${name} is inspired by the sacred geometries found on the pediments of Angkor temples.`}
            </p>

            <footer style={{ borderTop: '2px solid rgba(212,175,55,0.1)', paddingTop: '3rem', marginTop: '3rem', fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>
               {locale === 'fr' 
                 ? `Mots-clés de votre relique : bracelet feng shui, talisman protection, bijou spirituel, lithothérapie luxe, APSARA TEMPLE, artisanat sacré.`
                 : `Keywords for your relic: feng shui bracelet, protection talisman, spiritual jewelry, APSARA TEMPLE.`}
            </footer>

          </article>
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

      {/* 🚀 SEO RICH CONTENT SECTION (800+ words target) */}
      <section className="product-seo-content" style={{ padding: '80px 8%', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))' }}>
        <div className="content-narrow" style={{ maxWidth: '950px', margin: '0 auto' }}>
          <article className="seo-rich-text" style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--ivory)', opacity: 0.9, lineHeight: '2.1' }}>
            
            <header className="seo-meta-titles" style={{ marginBottom: '4rem', textAlign: 'center' }}>
               <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#d4af37', fontFamily: 'var(--font-cinzel), serif' }}>{locale === 'fr' ? `Guide Spirituel : Votre ${name} – Bracelet Feng Shui & Force` : `Focus: Your ${name} – Feng Shui Bracelet & Power`}</h2>
               <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.5 }}>{locale === 'fr' ? 'Le guide complet de votre talisman protection' : 'The complete guide to your protection talisman'}</p>
            </header>

            <div style={{ marginBottom: '5rem' }}>
              <h2 className="title-sacred" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#d4af37' }}>Bracelet Feng Shui, Talisman de Protection & Bijou Spirituel</h2>
              <p style={{ marginBottom: '2rem' }}>
                {locale === 'fr' 
                  ? `Le ${name} incarne une alliance parfaite entre l’esthétique sacrée et la puissance brute de l’intention. Ce n'est pas simplement un bijou spirituel ; c'est une invitation à se reconnecter à l'essentiel dans un monde devenu trop virtuel. À travers chaque courbe et chaque matériau noble, ce talisman protection véhicule une vibration ancestrale, héritée des rituels secrets d'Orient. En faisant l'acquisition de cet objet, vous affirmez votre quête de sens et de protection énergétique au quotidien.`
                  : `The ${name} embodies an alliance between sacred aesthetics and the raw power of intention. It is not simply a spiritual gemstone; it is an invitation to reconnect with the essential.`}
              </p>
              <p style={{ marginBottom: '2rem' }}>
                {locale === 'fr'
                  ? `Porter un bracelet feng shui comme le ${name} signifie aligner son propre rythme sur celui de l'univers. Chaque perle de ce talisman protection a été sélectionnée pour sa capacité à vibrer en résonance avec vos centres énergétiques. La lithothérapie moderne rencontre ici l'artisanat millénaire pour forger un bouclier invisible mais radieux contre les influences néfastes.`
                  : `Wearing a feng shui bracelet like the ${name} means aligning your own rhythm with that of the universe.`}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '80px', marginBottom: '5rem' }}>
              <div style={{ padding: '40px', background: 'rgba(212,175,55,0.05)', borderRadius: '4px', border: '1px solid #d4af3733' }}>
                 <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'var(--font-cinzel), serif', color: '#d4af37' }}>{locale === 'fr' ? 'Signification du Talisman' : 'Talisman Meaning'}</h2>
                 <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                   {locale === 'fr'
                     ? `Symbole d'éveil et de bouclier spirituel, le ${name} s'appuie sur une géométrie sacrée profonde. Dans les traditions anciennes, cet objet est considéré comme un vaisseau de lumière, protégeant son porteur contre les énergies stagnantes. Chaque aspect de sa conception, du choix de l'alliage à la patine finale, est un hommage aux gardiens des temples d'autrefois.`
                     : `A symbol of awakening and spiritual shield, the ${name} is based on deep sacred geometry.`}
                 </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-cinzel), serif' }}>{locale === 'fr' ? 'Énergie et Intention' : 'Energy and Intention'}</h2>
                 <p style={{ marginBottom: '1.5rem' }}>
                   {locale === 'fr'
                     ? `La puissance du ${name} réside autant dans sa forme physique que dans l'intention que vous y projetez. Avant de le porter, prenez un instant de recueillement. Visualisez une aura de protection se formant autour de vous alors que vous passez ce bijou spirituel à votre poignet gauche. Chez APSARA TEMPLE, nous ritualisons chaque pièce pour garantir une neutralité vibratoire optimale dès sa réception.`
                     : `The power of the ${name} lies as much in its physical form as in the intention you project onto it.`}
                 </p>
              </div>
            </div>

            <div style={{ marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', fontFamily: 'var(--font-cinzel), serif', color: 'var(--turquoise)' }}>{locale === 'fr' ? 'Comment utiliser ce Talisman au Quotidien' : 'How to Use This Talisman Daily'}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <p>
                  {locale === 'fr'
                    ? `Votre bracelet feng shui doit être perçu comme un prolongement de votre propre champ électromagnétique. Portez-le quotidiennement pour créer un ancrage spirituel fort. Il est recommandé de le nettoyer régulièrement—non pas physiquement, mais énergétiquement—sous la lumière de la lune ou par des fumigations de santal. Le ${name} gagnera en force à mesure que vous créerez un lien personnel avec lui.`
                    : `Your feng shui bracelet should be perceived as an extension of your own electromagnetic field.`}
                </p>
                <p>
                  {locale === 'fr'
                    ? `En période de stress ou de doute, touchez les perles du talisman protection pour vous reconnecter à votre centre. Ce geste simple déclenche une réponse mémorielle de sérénité. N'oubliez pas que votre bijou spirituel est un récepteur sensible : purifiez-le systématiquement après avoir traversé des environnements chargés d'émotions négatives.`
                    : `In times of stress or doubt, touch the beads of the protection talisman to reconnect with your center.`}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '5rem', background: 'rgba(0,0,0,0.3)', padding: '60px', borderLeft: '4px solid #d4af37' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem', fontFamily: 'var(--font-cinzel), serif' }}>{locale === 'fr' ? 'Symbolique Culturelle' : 'Cultural Symbolism'}</h2>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8 }}>
                {locale === 'fr'
                  ? `Puisant ses racines dans l'iconographie khmère et la sagesse védique, le ${name} est un pont vers les époques où l'homme vivait en symbiose avec le sacré. Porter cette relique, c'est porter un morceau d'histoire, une pièce d'artisanat qui refuse la standardisation moderne pour embrasser le mystère du fait-main ritualisé. C'est l'essence même d'APSARA TEMPLE : ramener la divination et la force sacrée au cœur du monde contemporain.`
                  : `Drawing its roots from Khmer iconography and Vedic wisdom, the ${name} is a bridge to eras when man lived in symbiosis with the sacred.`}
              </p>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '60px', textAlign: 'center' }}>
              {locale === 'fr' 
                ? `Mots-clés de l'âme : bracelet feng shui rituel, talisman protection authentique, bijou spirituel de créateur, artisanat sacré apsara temple.`
                : `Core keywords: ritual feng shui bracelet, authentic protection talisman, designer spiritual jewelry.`}
            </p>

          </article>
        </div>
      </section>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
