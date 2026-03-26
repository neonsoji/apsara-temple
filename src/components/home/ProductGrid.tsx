'use client';

import Link from 'next/link';
import { products } from '@/lib/products';
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
  // Filtrage des produits par catégorie via le moteur de boutique
  const relics = products.filter(p => p.category === category);

  if (relics.length === 0) return null;

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
                  src={relic.image} 
                  alt={relic.altText?.[locale as 'fr'|'en'] || relic.names[locale as 'fr'|'en']}
                  onError={(e) => {
                    e.currentTarget.src = "/images/talisman.webp";
                    e.currentTarget.style.opacity = "0.3";
                  }}
                />
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{relic.names[locale as 'fr'|'en']}</h3>
                <p className="product-price">{relic.price}</p>
                <p className={`product-availability ${relic.stock === 0 ? 'out-of-stock' : relic.stock < 5 ? 'low-stock' : ''}`}>
                  {relic.stock === 0 
                    ? dict.out_of_stock 
                    : relic.stock < 5 
                      ? dict.low_stock.replace('{count}', relic.stock.toString())
                      : dict.available}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}


