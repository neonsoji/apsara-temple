import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './Contact.css';

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="contact-page-container">
      <Navbar locale={locale} dict={dict.navigation} />
      
      <section className="contact-hero">
        <div className="contact-mist"></div>
        <div className="contact-content">
          <h1 className="contact-title title-sacred">ENTRER DANS LE TEMPLE</h1>
          <p className="contact-subtitle">
            {locale === 'fr' 
              ? "Une question sur une relique, un rituel ou votre commande ? Envoyez votre message à travers le voile."
              : "A question about a relic, a ritual, or your order? Send your message through the veil."}
          </p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-grid">
          <div className="contact-info-side">
            <div className="info-block">
              <h3>LE SANCTUAIRE</h3>
              <p>APSARA TEMPLE<br />Toulouse, France</p>
            </div>
            <div className="info-block">
              <h3>RÉSEAUX SACRÉS</h3>
              <p>Instagram: @apsaratemple</p>
              <p>Email: contact@apsaratemple.com</p>
            </div>
          </div>
          
          <div className="contact-form-side">
            <form className="mystical-form">
              <div className="form-row">
                <input type="text" placeholder={locale === 'fr' ? "Nom" : "Name"} className="mystic-input" required />
              </div>
              <div className="form-row">
                <input type="email" placeholder="Email" className="mystic-input" required />
              </div>
              <div className="form-row">
                <textarea placeholder={locale === 'fr' ? "Votre message" : "Your message"} className="mystic-textarea" rows={6} required></textarea>
              </div>
              <button type="submit" className="mystic-submit-btn btn-sacred">
                <span className="btn-label">ENVOYER AU TEMPLE</span>
                <span className="btn-aura"></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
