'use client';

import Link from 'next/link';
import './ProductGrid.css';

interface ProductGridProps {
  category: string;
  label: string;
  title: string;
  accentTitle: string;
  dict: any;
  locale: string;
}

export default function ProductGrid({ category, label, title, accentTitle, dict, locale }: ProductGridProps) {
  // Demo relics for the restoration (Adapté pour la Boutique Premium)
  const relics = category === 'pendentifs' ? [
    { 
      id: 1, 
      name: "SUTRA OF THE SILENT HEART", 
      slug: "sutra-of-the-silent-heart", 
      image: "/images/products/pendentifs/pendentif-bouddha-sutra-coeur-rotatif-protection.png",
      price: "185.00 €" 
    },
    { id: 2, name: "VENERABLE TALISMAN", slug: "venerable-talisman", price: "210.00 €" },
    { id: 3, name: "SACRED BRACELET", slug: "sacred-bracelet", price: "145.00 €" },
    { id: 4, name: "ANCIENT LOTUS RING", slug: "ancient-lotus-ring", price: "160.00 €" }
  ] : [
    { id: 1, name: "SUTRA OF THE SILENT HEART", slug: "sutra-of-the-silent-heart", price: "185.00 €" },
    { id: 2, name: "VENERABLE TALISMAN", slug: "venerable-talisman", price: "210.00 €" },
    { id: 3, name: "SACRED BRACELET", slug: "sacred-bracelet", price: "145.00 €" },
    { id: 4, name: "ANCIENT LOTUS RING", slug: "ancient-lotus-ring", price: "160.00 €" }
  ];

  return (
    <section id={category} className="product-grid-section">
      <div className="section-header">
        <span className="section-label">{label}</span>
        <h2 className="section-title">
          {title} <span className="text-accent-turquoise">{accentTitle}</span>
        </h2>
      </div>
      
      <div className="product-container">
        {relics.map((relic) => (
          <div key={relic.id} className="product-card">
            <Link href={`/${locale}/products/${relic.slug}`}>
              <div className="card-ornament top-left">✧</div>
              <div className="card-ornament top-right">✧</div>
              
              <div className="product-image-box">
                <img 
                  src={relic.image || `/images/products/${relic.slug}-01.webp`} 
                  alt={relic.name}
                  onError={(e) => {
                    // Fallback to placeholder if image missing during restoration
                    e.currentTarget.src = "/images/talisman.webp";
                    e.currentTarget.style.opacity = "0.3";
                  }}
                />
              </div>
              
              <div className="product-info">
                <p className="product-availability">{dict.available}</p>
                <h3 className="product-name">{relic.name}</h3>
                <p className="product-price" style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--turquoise)', letterSpacing: '1px' }}>{relic.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
