import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './legal.css';

export const metadata: Metadata = {
  title: 'CGU — Conditions Générales d\'Utilisation | APSARA TEMPLE',
  description: 'Conditions générales d\'utilisation du site APSARA TEMPLE — accès, propriété intellectuelle et responsabilité.',
};

export default async function CGU({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="legal-page-wrapper">
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
          <p className="legal-label">Règles d'Usage</p>
          <h1 className="legal-title title-sacred">Conditions Générales <span className="legal-accent">d'Utilisation</span></h1>
          <div className="legal-divider" />
        </div>

        <div className="legal-content">

          <section className="legal-section">
            <h2>Objet</h2>
            <p>Les présentes Conditions Générales d'Utilisation (CGU) définissent les règles d'accès et d'utilisation du site APSARA TEMPLE. En accédant à ce site, vous acceptez l'intégralité de ces conditions.</p>
          </section>

          <section className="legal-section">
            <h2>Accès au site</h2>
            <p>L'accès au site APSARA TEMPLE est gratuit et ouvert à tous. Vous êtes responsable de l'utilisation que vous en faites et du respect des lois en vigueur dans votre pays de résidence.</p>
            <p>SARL FUJUKI se réserve le droit de restreindre ou de suspendre l'accès au site à tout moment et sans préavis, notamment pour des raisons de maintenance.</p>
          </section>

          <section className="legal-section">
            <h2>Propriété intellectuelle</h2>
            <p>L'ensemble des contenus du site APSARA TEMPLE (textes, images, logos, vidéos, éléments graphiques, compositions visuelles, photographies des reliques) sont protégés par les droits d'auteur et les droits de propriété intellectuelle.</p>
            <p>Toute reproduction, modification, distribution, publication ou exploitation commerciale sans autorisation préalable et écrite de SARL FUJUKI est strictement interdite. Vous pouvez consulter les contenus à titre personnel et privé uniquement.</p>
          </section>

          <section className="legal-section">
            <h2>Interdictions</h2>
            <p>Il est strictement interdit de :</p>
            <ul>
              <li>Reproduire, copier ou télécharger les contenus du site à des fins commerciales</li>
              <li>Modifier, adapter ou altérer les contenus du site</li>
              <li>Utiliser le site ou ses contenus pour diffuser des informations illégales ou offensantes</li>
              <li>Tenter de pirater, saturer ou compromettre les serveurs du site</li>
              <li>Collecter des données personnelles d'autres utilisateurs sans leur consentement</li>
              <li>Usurper l'identité de APSARA TEMPLE ou de SARL FUJUKI</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Limitation de responsabilité</h2>
            <p>SARL FUJUKI ne garantit pas la disponibilité permanente du site. Le site est fourni «&nbsp;tel quel&nbsp;» sans aucune garantie explicite ou implicite quant à son exactitude ou son adéquation à un usage particulier.</p>
            <p>SARL FUJUKI ne peut être tenue responsable des dommages résultant de l'accès, de l'utilisation ou de l'impossibilité d'accès au site, ni des éventuels virus ou programmes malveillants transmis par le biais du site.</p>
          </section>

          <section className="legal-section">
            <h2>Liens hypertextes</h2>
            <p>Le site APSARA TEMPLE peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre informatif. SARL FUJUKI n'est pas responsable du contenu de ces sites externes. La présence d'un lien ne constitue en aucun cas une recommandation ou une validation.</p>
          </section>

          <section className="legal-section">
            <h2>Modification des conditions</h2>
            <p>SARL FUJUKI se réserve le droit de modifier les présentes CGU à tout moment et sans préavis. Les modifications prennent effet dès leur publication sur le site. Votre utilisation continue du site après modification vaut acceptation des nouvelles conditions.</p>
          </section>

          <section className="legal-section">
            <h2>Données personnelles & Cookies</h2>
            <p>Pour plus d'informations sur le traitement de vos données personnelles et notre usage des cookies, veuillez consulter notre <a href="/fr/politique-confidentialite">Politique de Confidentialité</a>.</p>
          </section>

          <section className="legal-section">
            <h2>Signalement de contenu illégal</h2>
            <p>Si vous découvrez un contenu illégal ou contraire aux présentes CGU sur notre site, nous vous invitons à nous le signaler par email à l'adresse indiquée dans nos <a href="/fr/mentions-legales">mentions légales</a>. Nous traiterons votre signalement dans les plus brefs délais.</p>
          </section>

          <section className="legal-section">
            <h2>Loi applicable</h2>
            <p>Les présentes CGU sont soumises à la loi française et à la juridiction exclusive des tribunaux de Toulouse.</p>
          </section>

        </div>
      </div>
    </main>
    <Footer dict={dict.footer} locale={locale} />
  </div>
  );
}
