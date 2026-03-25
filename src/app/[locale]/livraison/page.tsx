import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './legal.css';

export const metadata: Metadata = {
  title: 'Livraison & Retours | APSARA TEMPLE',
  description: `Politique de livraison et de retours d'APSARA TEMPLE — délais, frais de port, suivi et droit de rétractation.`,
};

export default async function LivraisonRetours({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="legal-page-wrapper">
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
          <p className="legal-label">Service & Soin</p>
          <h1 className="legal-title title-sacred">Livraison <span className="legal-accent">& Retours</span></h1>
          <div className="legal-divider" />
        </div>

        <div className="legal-content">

          <section className="legal-section">
            <h2>Expédition des Reliques</h2>
            <p>Chaque relique APSARA TEMPLE est emballée avec un soin ritualisé : pochette en soie, coffret rigide et carte d'authenticité calligraphiée. L'intégrité de votre pièce est notre première obligation.</p>
            <div className="legal-table">
              <div className="legal-table-row">
                <span className="legal-table-label">France métropolitaine</span>
                <span className="legal-table-value">3 à 5 jours ouvrés — Colissimo Signature</span>
              </div>
              <div className="legal-table-row">
                <span className="legal-table-label">Europe</span>
                <span className="legal-table-value">5 à 8 jours ouvrés</span>
              </div>
              <div className="legal-table-row">
                <span className="legal-table-label">International</span>
                <span className="legal-table-value">7 à 12 jours ouvrés — DHL Express</span>
              </div>
              <div className="legal-table-row">
                <span className="legal-table-label">Frais de port offerts</span>
                <span className="legal-table-value">Dès 200 € d'achat (France & Europe)</span>
              </div>
            </div>
            <p>Les délais indiqués sont estimatifs et non contractuels. SARL FUJUKI ne peut être tenue responsable des retards imputables au transporteur ou à la douane.</p>
          </section>

          <section className="legal-section">
            <h2>Suivi de Commande</h2>
            <p>Dès l'expédition de votre relique, vous recevrez un email contenant votre numéro de suivi personnalisé. Vous pourrez suivre l'acheminement de votre pièce en temps réel jusqu'à votre porte.</p>
          </section>

          <section className="legal-section">
            <h2>Droit de Rétractation & Retours</h2>
            <p>Conformément à l'article L.&nbsp;221-18 du Code de la consommation, vous disposez d'un délai de <strong>14 jours</strong> à compter de la réception de votre commande pour exercer votre droit de rétractation, sans justification et sans pénalité.</p>
            <p>Pour initier un retour, contactez-nous par email avec votre numéro de commande avant l'expiration de ce délai.</p>
          </section>

          <section className="legal-section">
            <h2>Conditions de Retour</h2>
            <p>Pour être acceptées, les pièces retournées doivent impérativement :</p>
            <ul>
              <li>Être dans leur état d'origine, non portées, non utilisées</li>
              <li>Porter toutes leurs étiquettes d'origine intactes</li>
              <li>Être renvoyées dans leur emballage rituel complet (pochette en soie, coffret, carte d'authenticité)</li>
              <li>Être accompagnées d'un justificatif de commande</li>
            </ul>
            <p>Toute pièce portée, endommagée, incomplète ou renvoyée hors délai ne pourra être ni remboursée ni échangée.</p>
            <p><strong>Les frais de retour sont à la charge de l'acheteur.</strong></p>
          </section>

          <section className="legal-section">
            <h2>Remboursement</h2>
            <p>Après réception et vérification de la pièce retournée, le remboursement sera effectué dans un délai de <strong>14 jours</strong> par le même moyen de paiement que celui utilisé lors de la commande.</p>
          </section>

          <section className="legal-section">
            <h2>Article Défectueux ou Erreur de Commande</h2>
            <p>Si vous recevez une pièce défectueuse ou ne correspondant pas à votre commande, contactez-nous immédiatement par email avec des photos. Nous prendrons en charge l'intégralité des frais de retour et vous enverrons une nouvelle relique sans surcoût.</p>
          </section>

        </div>
      </div>
    </main>
    <Footer dict={dict.footer} locale={locale} />
  </div>
  );
}
