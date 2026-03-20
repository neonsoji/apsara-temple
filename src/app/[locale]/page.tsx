import { Metadata } from 'next';
import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: 'APSARA TEMPLE | Sacred Talismans & Spiritual Protection Relics',
  description: 'Discover the collection of sacred talismans and handcrafted protection relics. Forged from ancient rituals, each object is a vessel of intention for the modern seeker.',
  keywords: ['sacred talismans', 'protection jewelry', 'buddha pendant', 'spiritual relics', 'meditation tools', 'Apsara Temple'],
};
import Hero from "@/components/home/Hero"
import ProductGrid from "@/components/home/ProductGrid"
import Story from "@/components/home/Story"
import Footer from "@/components/layout/Footer"
import Separator from "@/components/home/Separator"

import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "APSARA TEMPLE",
    "url": `https://apsara-temple.com/${locale}`,
    "logo": "https://apsara-temple.com/images/logo01.svg",
    "description": dict.hero.subtitle,
    "sameAs": [
      "https://www.instagram.com/apsaratemple"
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* 1) TOP HEADER / MENU */}
      <Navbar locale={locale} dict={dict.navigation} />

      {/* 2) HERO SECTION */}
      <Hero dict={dict.hero} />

      {/* 3) CATEGORIZED PRODUCT SECTIONS */}
      <div className="homepage-shop">
        <ProductGrid 
          category="pendentifs" 
          label={dict.home.sections.pendentifs.label} 
          title={dict.home.sections.pendentifs.title} 
          accentTitle={dict.home.sections.pendentifs.accent} 
          dict={dict.products}
          locale={locale}
        />

        <ProductGrid 
          category="talismans" 
          label={dict.home.sections.talismans.label} 
          title={dict.home.sections.talismans.title} 
          accentTitle={dict.home.sections.talismans.accent}
          dict={dict.products}
          locale={locale}
        />

        <ProductGrid 
          category="bracelets" 
          label={dict.home.sections.bracelets.label} 
          title={dict.home.sections.bracelets.title} 
          accentTitle={dict.home.sections.bracelets.accent} 
          dict={dict.products}
          locale={locale}
        />
      </div>

      <Separator />

      {/* 5) STORY SECTION */}
      <Story dict={dict.home.story} />

      {/* 6) FOOTER */}
      <Footer dict={dict.footer} />
    </main>
  );
}
