import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import './Journal.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEN = locale === 'en';

  return {
    title: isEN
      ? 'The Temple Scrolls — Sacred Knowledge | APSARA TEMPLE Journal'
      : 'Les Parchemins du Temple — Connaissance Sacrée | Journal APSARA TEMPLE',
    description: isEN
      ? 'Explore the sacred knowledge of APSARA TEMPLE. Guides on Buddhist symbols, spiritual talismans, meditation rituals and the ancient wisdom behind each sacred object.'
      : 'Explorez la connaissance sacrée d\'APSARA TEMPLE. Guides sur les symboles bouddhistes, talismans spirituels, rituels de méditation et la sagesse ancienne derrière chaque objet sacré.',
  };
}

const ARTICLES_EN = [
  {
    id: 'buddha-pendant-meaning',
    tag: 'Pillar Guide',
    readTime: '12 min',
    title: 'The Buddha Pendant: A Complete Guide for the Modern Seeker',
    excerpt:
      'From its ancient origins in temple tradition to its role as a sacred companion in modern daily life — everything you need to choose, wear, and understand your talisman.',
    href: '/en/journal/buddha-pendant-meaning',
    featured: true,
  },
  {
    id: 'heart-sutra-meaning',
    tag: 'Sacred Texts',
    readTime: '8 min',
    title: 'The Heart Sutra: 260 Characters That Changed Buddhist History',
    excerpt:
      'The most distilled expression of Buddhist wisdom. We explore the origin, the sacred characters, and why they are engraved on objects of protection.',
    href: '/en/journal/heart-sutra-meaning',
    featured: false,
  },
  {
    id: 'why-wear-spiritual-talisman',
    tag: 'Ritual Practice',
    readTime: '6 min',
    title: 'Why Wear a Spiritual Talisman Every Day?',
    excerpt:
      'A sacred object worn close to the body is not superstition — it is an act of intentional living. We explore the psychology and tradition behind wearable relics.',
    href: '/en/journal/why-wear-spiritual-talisman',
    featured: false,
  },
  {
    id: 'buddhist-protection-symbols',
    tag: 'Ancient Wisdom',
    readTime: '10 min',
    title: 'Buddhist Symbols & Protection: What Ancient Monks Carried',
    excerpt:
      'Long before modern jewelry, monks and seekers carried sacred objects inscribed with protective symbols. A journey through the symbolism of Buddhist protective arts.',
    href: '/en/journal/buddhist-protection-symbols',
    featured: false,
  },
];

const ARTICLES_FR = [
  {
    id: 'signification-pendentif-bouddha',
    tag: 'Guide Principal',
    readTime: '12 min',
    title: 'Le Pendentif Bouddha : Guide Complet pour le Chercheur Moderne',
    excerpt:
      'De ses origines dans la tradition des temples à son rôle de compagnon sacré au quotidien — tout ce qu\'il faut savoir pour choisir, porter et comprendre son talisman.',
    href: '/fr/journal/signification-pendentif-bouddha',
    featured: true,
  },
  {
    id: 'signification-sutra-du-coeur',
    tag: 'Textes Sacrés',
    readTime: '8 min',
    title: 'Le Sutra du Cœur : 260 Caractères qui ont Changé l\'Histoire Bouddhiste',
    excerpt:
      'L\'expression la plus pure de la sagesse bouddhiste. Nous explorons son origine, ses caractères sacrés, et pourquoi ils sont gravés sur des objets de protection.',
    href: '/fr/journal/signification-sutra-du-coeur',
    featured: false,
  },
  {
    id: 'pourquoi-porter-talisman-spirituel',
    tag: 'Pratique Rituelle',
    readTime: '6 min',
    title: 'Pourquoi Porter un Talisman Spirituel au Quotidien ?',
    excerpt:
      'Un objet sacré porté près du corps n\'est pas superstition — c\'est un acte de vie intentionnelle. Nous explorons la psychologie et la tradition des reliques portées.',
    href: '/fr/journal/pourquoi-porter-talisman-spirituel',
    featured: false,
  },
  {
    id: 'symboles-bouddhistes-protection',
    tag: 'Sagesse Ancienne',
    readTime: '10 min',
    title: 'Symboles Bouddhistes et Protection : Ce que Portaient les Moines',
    excerpt:
      'Avant les bijoux modernes, les moines et chercheurs portaient des objets sacrés inscrits de symboles protecteurs. Un voyage dans l\'art protecteur bouddhiste.',
    href: '/fr/journal/symboles-bouddhistes-protection',
    featured: false,
  },
];

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEN = locale === 'en';

  const articles = isEN ? ARTICLES_EN : ARTICLES_FR;
  const featured = articles.find((a) => a.featured)!;
  const secondary = articles.filter((a) => !a.featured);

  return (
    <div className="journal-page">
      <Navbar locale={locale} dict={dict.navigation} />

      {/* HERO */}
      <section className="journal-hero">
        <div className="journal-hero-glow"></div>
        <div className="journal-hero-content">
          <span className="journal-eyebrow">
            ✧ {isEN ? 'Temple Scrolls' : 'Parchemins du Temple'} ✧
          </span>
          <h1 className="journal-hero-title">
            {isEN ? (
              <>The <span className="text-accent-gold">Sacred</span> Journal</>
            ) : (
              <>Le <span className="text-accent-gold">Journal</span> Sacré</>
            )}
          </h1>
          <p className="journal-hero-sub">
            {isEN
              ? 'Ancient knowledge. Preserved. Transmitted. For the seeker who goes beyond the object.'
              : 'Connaissance ancienne. Préservée. Transmise. Pour le chercheur qui va au-delà de l\'objet.'}
          </p>
        </div>
        <div className="journal-scroll-line"></div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="journal-featured">
        <div className="journal-container">
          <Link href={featured.href} className="featured-card">
            <div className="featured-card-glow"></div>
            <div className="featured-card-inner">
              <div className="featured-meta">
                <span className="article-tag">{featured.tag}</span>
                <span className="article-sep">·</span>
                <span className="article-time">{featured.readTime} {isEN ? 'read' : 'de lecture'}</span>
              </div>
              <div className="featured-ornament">✧</div>
              <h2 className="featured-title">{featured.title}</h2>
              <p className="featured-excerpt">{featured.excerpt}</p>
              <div className="featured-cta">
                <span>{isEN ? 'Enter the Scroll' : 'Ouvrir le Parchemin'}</span>
                <span className="cta-arrow">→</span>
              </div>
            </div>
            <div className="featured-card-border-top"></div>
            <div className="featured-card-border-bottom"></div>
          </Link>
        </div>
      </section>

      {/* SECONDARY ARTICLES GRID */}
      <section className="journal-grid-section">
        <div className="journal-container">
          <div className="journal-divider">
            <span className="divider-line"></span>
            <span className="divider-glyph">☽ ✦ ☾</span>
            <span className="divider-line"></span>
          </div>

          <h2 className="journal-grid-title">
            {isEN ? 'Further Exploration' : 'Approfondissements'}
          </h2>

          <div className="journal-grid">
            {secondary.map((article) => (
              <Link key={article.id} href={article.href} className="article-card">
                <div className="article-card-glow"></div>
                <div className="article-meta">
                  <span className="article-tag">{article.tag}</span>
                  <span className="article-time">{article.readTime}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-read-more">
                  {isEN ? 'Read' : 'Lire'} <span className="cta-arrow">→</span>
                </div>
                <div className="article-card-line"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND KNOWLEDGE BANNER */}
      <section className="journal-banner">
        <div className="journal-container">
          <div className="banner-inner">
            <div className="banner-ornament">✧</div>
            <p className="banner-text">
              {isEN
                ? 'Every object from APSARA TEMPLE carries a living tradition. These scrolls exist to make that tradition visible.'
                : 'Chaque objet d\'APSARA TEMPLE porte une tradition vivante. Ces parchemins existent pour rendre cette tradition visible.'}
            </p>
            <Link
              href={`/${locale}/products/sutra-of-the-silent-heart`}
              className="banner-link"
            >
              {isEN ? 'Discover the Sutra of the Silent Heart →' : 'Découvrir le Sutra du Cœur Silencieux →'}
            </Link>
          </div>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </div>
  );
}
