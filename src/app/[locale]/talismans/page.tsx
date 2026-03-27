import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/home/ProductGrid';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';

export default async function talismansPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  // filtering is now handled inside ProductGrid via Supabase

  return (
    <div className="category-page">
      <Navbar locale={locale} dict={dict.navigation} />
      
      <main style={{ paddingTop: '160px', minHeight: '100vh', background: 'transparent' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-label" style={{ color: 'var(--turquoise)', letterSpacing: '0.4em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Arts Sacrés</span>
          <h1 className="section-title" style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '4rem', color: 'var(--ivory)', letterSpacing: '0.2em' }}>TALISMANS</h1>
        </div>

        <ProductGrid 
          locale={locale} 
          category="pendentifs"
          label="Arts Sacrés"
          title="GALERIE DES"
          accentTitle="TALISMANS"
          dict={dict.products} 
        />
      </main>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
