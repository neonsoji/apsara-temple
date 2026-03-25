import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';

export default async function CheckoutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="checkout-page" style={{ background: 'transparent', minHeight: '100vh', color: 'var(--ivory)', paddingTop: '150px' }}>
      <Navbar locale={locale} dict={dict.navigation} />
      
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5% 150px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem', opacity: 0.2 }}>✧</div>
        <h1 className="title-sacred" style={{ fontSize: '3rem', marginBottom: '2rem' }}>ACTION RITUELLE</h1>
        
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '60px', borderRadius: '4px', backdropFilter: 'blur(20px)' }}>
           <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', marginBottom: '2rem', fontStyle: 'italic' }}>
              Le Portail de Paiement est en cours de consécration.
           </h2>
           <p style={{ opacity: 0.6, lineHeight: 1.8, marginBottom: '3rem' }}>
              Nos gardiens finalisent l'intégration sécurisée de Stripe et des cryptomonnaies sacrées. 
              Pour une acquisition immédiate par virement ou lien direct, veuillez contacter le Temple.
           </p>
           <a href={`/${locale}/contact`} className="btn-sacred">
              <span className="btn-label">CONTACTER LE TEMPLE</span>
              <span className="btn-aura"></span>
           </a>
        </div>
      </main>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
