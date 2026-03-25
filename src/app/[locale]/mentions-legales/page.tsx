import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './legal.css';

export const metadata: Metadata = {
  title: 'Mentions Légales | APSARA TEMPLE',
  description: 'Informations légales concernant le site APSARA TEMPLE — éditeur, hébergeur et responsable de publication.',
};

export default async function MentionsLegales({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="legal-page-wrapper">
      <Navbar locale={locale} dict={dict.navigation} />
      <main className="legal-page">
        <div className="legal-container">
          <div className="legal-header">
          <p className="legal-label">Informations Juridiques</p>
          <h1 className="legal-title title-sacred">Mentions <span className="legal-accent">Légales</span></h1>
          <div className="legal-divider" />
        </div>

        <div className="legal-content">

          <section className="legal-section">
            <h2>Éditeur du site</h2>
            <p>SARL FUJUKI<br />
            7 rue Temponières<br />
            31000 Toulouse – France</p>
            <p>SIREN : 504 733 098<br />
            RCS : Toulouse<br />
            TVA intracommunautaire : FR12 504733098</p>
            <p>Gérante : Yanqiong Xiang<br />
            Téléphone : <a href="tel:+33561213104">+33 5 61 21 31 04</a></p>
            <p>Activité : Commerce de détail de vêtements, accessoires et objects asiatiques.</p>
          </section>

          <section className="legal-section">
            <h2>Hébergement</h2>
            <p>Ce site est hébergé par Vercel Inc.<br />
            340 Pine Street, Suite 701<br />
            San Francisco, CA 94104 – États-Unis<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
          </section>

          <section className="legal-section">
            <h2>Responsable de la publication</h2>
            <p>Yanqiong Xiang, Gérante de SARL FUJUKI</p>
          </section>

          <section className="legal-section">
            <h2>Propriété intellectuelle</h2>
            <p>L'ensemble des contenus présents sur le site APSARA TEMPLE (textes, images, logos, éléments graphiques, photographies) sont protégés par le droit d'auteur et les droits de propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation préalable et écrite est strictement interdite.</p>
          </section>

          <section className="legal-section">
            <h2>Données personnelles & Cookies</h2>
            <p>Les informations concernant la collecte et le traitement des données personnelles sont détaillées dans notre <a href="/fr/politique-confidentialite">Politique de Confidentialité</a>. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à l'adresse indiquée ci-dessus.</p>
          </section>

          <section className="legal-section">
            <h2>Loi applicable</h2>
            <p>Les présentes mentions légales sont soumises à la loi française. Tout litige relatif à l'utilisation du site sera soumis à la juridiction exclusive des tribunaux compétents de Toulouse.</p>
          </section>

        </div>
      </div>
    </main>
    <Footer dict={dict.footer} locale={locale} />
  </div>
  );
}
