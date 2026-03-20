import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/locales';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from './article-content';
import './Article.css';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles[slug];
  
  if (!article || article.locale !== locale) {
    return { title: 'Not Found' };
  }

  return {
    title: `${article.seoTitle} | APSARA TEMPLE`,
    description: article.metaDescription,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const isEN = locale === 'en';
  
  const article = articles[slug];
  
  if (!article || article.locale !== locale) {
    notFound();
  }

  return (
    <div className="article-page">
      <Navbar locale={locale} dict={dict.navigation} />
      
      {/* 1. HERO SHOT */}
      <section className="article-hero">
        <div className="article-hero-bg">
          <div className="overlay-vignette"></div>
        </div>
        <div className="article-hero-content">
          <div className="meta-info">
             <span className="meta-tag">{article.tag}</span>
             <span className="meta-sep">✧</span>
             <span className="meta-time">{article.readTime}</span>
          </div>
          <h1 className="article-title">{article.title}</h1>
        </div>
      </section>

      {/* 2. MAIN CONTENT BODY */}
      <section className="article-body">
         <div className="article-container">
            <div 
              className="article-content" 
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }} 
            />
         </div>
      </section>

      {/* 3. PRODUCT LINK (CTA) */}
      <section className="article-cta">
        <div className="cta-container">
           <div className="cta-ornament">✧</div>
           <p className="cta-text">{isEN ? 'Our master artisans have created a talisman capturing this exact wisdom.' : 'Nos maîtres artisans ont créé un talisman capturant cette même sagesse.'}</p>
           <Link href={`/${locale}/products/sutra-of-the-silent-heart`} className="cta-button-gold">
              {isEN ? 'Discover the Sutra of the Silent Heart' : 'Découvrir le Sutra du Cœur Silencieux'}
           </Link>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </div>
  );
}
