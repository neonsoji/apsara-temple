import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './legal.css';

export const metadata: Metadata = {
  title: 'CGV — Conditions Générales de Vente | APSARA TEMPLE',
  description: 'Conditions générales de vente du site APSARA TEMPLE — commandes, paiement, livraison, retours et garanties.',
};

export default async function CGV({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="legal-page-wrapper">
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
          <p className="legal-label">Engagement & Transparence</p>
          <h1 className="legal-title title-sacred">Conditions Générales <span className="legal-accent">de Vente</span></h1>
          <div className="legal-divider" />
        </div>

        <div className="legal-content">

          <section className="legal-section">
            <h2>Objet</h2>
            <p>Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes réalisées sur le site marchand APSARA TEMPLE par la SARL FUJUKI. Toute commande implique l'acceptation pleine et entière des présentes CGV.</p>
          </section>

          <section className="legal-section">
            <h2>Produits & Tarifs</h2>
            <p>Tous nos talismans, reliques et objets sacrés sont présentés avec leurs descriptions, caractéristiques et tarifs en vigueur au moment de la consultation. Les prix affichés sont en euros TTC et incluent la TVA applicable. Les prix peuvent être modifiés sans préavis.</p>
            <p>Ces pièces sont des objets artisanaux à vocation décorative et symbolique. Leur composition est décrite comme «&nbsp;métal&nbsp;» ou «&nbsp;alliage métallique&nbsp;» conformément aux réglementations en vigueur sur la description des matériaux.</p>
          </section>

          <section className="legal-section">
            <h2>Commande</h2>
            <p>Toute commande passée sur notre site constitue une offre d'achat. Le contrat de vente est formé dès la confirmation de votre commande par email. Vous devez avoir au moins 18 ans ou l'autorisation de vos parents ou tuteurs pour passer commande.</p>
            <p>APSARA TEMPLE se réserve le droit d'annuler toute commande en cas de rupture de stock ou d'erreur manifeste de prix, avec remboursement intégral garanti.</p>
          </section>

          <section className="legal-section">
            <h2>Modes de Paiement</h2>
            <p>Nous acceptons les moyens de paiement suivants :</p>
            <ul>
              <li>Cartes bancaires (Visa, Mastercard, American Express)</li>
              <li>Paiements mobiles NFC (Apple Pay, Google Pay)</li>
            </ul>
            <p>Les transactions sont sécurisées par un prestataire de paiement agréé (protocole SSL). Aucun numéro de carte n'est conservé sur nos serveurs.</p>
          </section>

          <section className="legal-section">
            <h2>Livraison</h2>
            <p>Chaque relique APSARA TEMPLE est emballée avec un soin extrême dans une pochette rituelle en soie et un coffret de protection garantissant l'intégrité de la pièce.</p>
            <ul>
              <li><strong>France métropolitaine :</strong> 3 à 5 jours ouvrés via Colissimo Signature.</li>
              <li><strong>Europe :</strong> 5 à 8 jours ouvrés.</li>
              <li><strong>International :</strong> 7 à 12 jours ouvrés via DHL Express.</li>
              <li><strong>Frais de port :</strong> offerts dès 200&nbsp;€ d'achat en France et en Europe.</li>
            </ul>
            <p>Les délais indiqués sont donnés à titre informatif. SARL FUJUKI ne peut être tenue responsable des retards causés par le transporteur.</p>
          </section>

          <section className="legal-section">
            <h2>Droit de Rétractation</h2>
            <p>Conformément à l'article L.&nbsp;221-18 du Code de la consommation, vous disposez d'un délai de <strong>14 jours</strong> à compter de la réception de votre commande pour exercer votre droit de rétractation, sans justification et sans pénalité.</p>
            <p>Conditions du retour :</p>
            <ul>
              <li>La pièce doit être retournée dans son état d'origine, non portée, non utilisée.</li>
              <li>L'emballage rituel d'origine (pochette en soie, coffret, carte d'authenticité) doit être intact.</li>
              <li>Les frais de retour sont à votre charge.</li>
            </ul>
            <p>Tout article endommagé, porté ou renvoyé hors délai ne pourra pas être remboursé.</p>
          </section>

          <section className="legal-section">
            <h2>Garantie Légale</h2>
            <p>Les produits vendus bénéficient de la garantie légale de conformité de deux ans à compter de la date de livraison, conformément aux articles L.&nbsp;217-4 et suivants du Code de la consommation. En cas de défaut de conformité ou de vice caché, vous pouvez demander la réparation ou l'échange du produit.</p>
          </section>

          <section className="legal-section">
            <h2>Zone Géographique de Vente</h2>
            <p>Nos ventes sont principalement réservées à la France métropolitaine et à l'Union Européenne. SARL FUJUKI se réserve le droit de refuser une commande en dehors de ces zones géographiques.</p>
          </section>

          <section className="legal-section">
            <h2>Responsabilité</h2>
            <p>SARL FUJUKI ne peut être tenue responsable des dommages indirects, pertes de profit ou préjudices résultant de l'accès ou de l'utilisation du site APSARA TEMPLE.</p>
          </section>

          <section className="legal-section">
            <h2>Résolution des Litiges — Médiation</h2>
            <p>En cas de litige, nous vous invitons à nous contacter en premier lieu par email ou téléphone pour trouver une solution amiable. À défaut d'accord, vous pouvez contacter un médiateur de la consommation agréé.</p>
            <p>Conformément à l'article L.&nbsp;612-1 du Code de la consommation, vous pouvez également soumettre votre litige sur la plateforme européenne de résolution en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a></p>
          </section>

          <section className="legal-section">
            <h2>Loi Applicable</h2>
            <p>Les présentes CGV sont soumises à la loi française. Les litiges seront portés devant les juridictions compétentes du siège social de SARL FUJUKI à Toulouse.</p>
          </section>

        </div>
      </div>
    </main>
    <Footer dict={dict.footer} locale={locale} />
  </div>
  );
}
