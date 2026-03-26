import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import CheckoutContent from '@/components/checkout/CheckoutContent';

export default async function CheckoutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="checkout-page" style={{ background: 'transparent', minHeight: '100vh', color: 'var(--ivory)', paddingTop: '150px' }}>
      <Navbar locale={locale} dict={dict.navigation} />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5% 150px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem', opacity: 0.2 }}>✧</div>
        <h1 className="title-sacred" style={{ fontSize: '3rem', marginBottom: '4rem' }}>
          {locale === 'fr' ? 'ACTION RITUELLE' : 'RITUAL ACTION'}
        </h1>
        
        <CheckoutContent locale={locale} dict={dict} />
      </main>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
