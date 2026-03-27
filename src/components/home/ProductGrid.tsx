import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory } from '@/services/products';
import './ProductGrid.css';

interface ProductGridProps {
  category: string;
  label: string;
  title: string;
  accentTitle: string;
  dict: any;
  locale: string;
}

export default async function ProductGrid({ category, label, title, accentTitle, dict, locale }: ProductGridProps) {
  // 🧱 1. FETCH DIRECT DEPUIS SUPABASE (Sans cache)
  const relics = await getProductsByCategory(category);

  if (!relics || relics.length === 0) return null;

  return (
    <section id={category} className="product-grid-section">
      <div className="section-header">
        <span className="section-label">{label}</span>
        <h2 className="section-title">
          {title} <span className="text-accent-turquoise">{accentTitle}</span>
        </h2>
      </div>
      
      <div className="product-container">
        {relics.map((relic) => {
          const name = locale === 'en' ? (relic.name_en || relic.name) : relic.name;
          const priceStr = `${relic.price.toFixed(2)} €`;
          const mainImage = relic.image || '/placeholder.png';
          
          return (
            <div key={relic.id} className="product-card">
              <Link href={`/${locale}/products/${relic.slug}`}>
                <div className="card-ornament top-left">✧</div>
                <div className="card-ornament top-right">✧</div>
                
                <div className="product-image-box" style={{ position: 'relative', overflow: 'hidden' }}>
                  {/* use regular img for dev reliability if needed but Image is fine with remotePatterns */}
                  <Image 
                    src={mainImage} 
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="product-image-core opacity-in"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{name}</h3>
                  <p className="product-price">{priceStr}</p>
                  
                  <div className={`product-availability ${relic.stock === 0 ? 'out-of-stock' : relic.stock < 1 ? 'low-stock' : ''}`}>
                    {relic.stock === 0 
                      ? dict.out_of_stock 
                      : relic.stock <= 1 
                        ? dict.low_stock.replace('{count}', relic.stock.toString())
                        : dict.available}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
