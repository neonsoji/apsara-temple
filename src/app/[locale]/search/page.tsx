'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products } from '@/lib/products';
import Link from 'next/link';
import './Search.css';

export default function SearchPage({ params }: { params: any }) {
  const { locale } = React.use(params) as any;
  const [query, setQuery] = useState('');

  const filtered = products.filter(p => 
    p.names[locale as 'fr'|'en'].toLowerCase().includes(query.toLowerCase()) ||
    p.descriptions[locale as 'fr'|'en'].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page-container">
      <Navbar locale={locale} dict={{}} /> {/* dict will be loaded from layout or handled */}
      
      <section className="search-hero">
        <div className="search-mist"></div>
        <div className="search-content">
          <h1 className="search-title title-sacred">ORACLE DE RECHERCHE</h1>
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder={locale === 'fr' ? "Quelle relique cherchez-vous ?" : "Which relic do you seek?"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            <div className="input-glow"></div>
          </div>
        </div>
      </section>

      <section className="search-results">
        <div className="results-grid">
          {filtered.map(product => (
            <Link 
              href={`/${locale}/products/${product.slug}`} 
              key={product.id}
              className="search-result-card"
            >
              <div className="result-image-box">
                <img src={product.image} alt={product.names[locale as 'fr'|'en']} />
              </div>
              <div className="result-info">
                <h3>{product.names[locale as 'fr'|'en']}</h3>
                <p className="result-price">{product.price}</p>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="no-results">
              {locale === 'fr' ? "Le silence répond à votre quête..." : "Only silence answers your quest..."}
            </div>
          )}
        </div>
      </section>

      {/* Footer handles dict via props in reality, here simplified for the scan */}
      <Footer dict={{}} locale={locale} />
    </div>
  );
}
