import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './Account.css';

export default async function AccountPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="account-page-container">
      <Navbar locale={locale} dict={dict.navigation} />
      
      <section className="account-hero">
        <div className="account-mist"></div>
        <div className="account-content">
          <h1 className="account-title title-sacred">VOTRE ESPACE SACRÉ</h1>
          <p className="account-subtitle">Connectez-vous pour retrouver vos reliques et rituels.</p>
        </div>
      </section>

      <section className="login-section">
        <div className="login-box">
          <div className="login-tabs">
            <button className="login-tab active">S'IDENTIFIER</button>
            <button className="login-tab">S'INSCRIRE</button>
          </div>
          <form className="login-form">
            <div className="form-group">
              <label>SOUCHIER ÉLECTRONIQUE (EMAIL)</label>
              <input type="email" placeholder="votre@âme.fr" required />
            </div>
            <div className="form-group">
              <label>CLEF SECRÈTE (MOT DE PASSE)</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="login-submit btn-sacred">
               <span className="btn-label">RENTRER DANS LE TEMPLE</span>
               <span className="btn-aura"></span>
            </button>
            <p className="forgot-pass">Clef perdue ? Demander une nouvelle lumière.</p>
          </form>
        </div>
      </section>

      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
