import type { Metadata } from "next";
import { Cinzel, Playfair_Display } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/context/CartContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Clarity from "@/components/analytics/Clarity";


const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apsara-temple.com"),
  title: "APSARA TEMPLE | Reliques Sacrées & Talismans Mystiques",
  description: "Entrez dans le sanctuaire d'APSARA TEMPLE. Découvrez des talismans sacrés, des bracelets bénis et des reliques ancestrales pour incarner votre véritable pouvoir spirituel.",
  alternates: {
    canonical: "https://apsara-temple.com",
  },
  manifest: "/site.webmanifest",
  themeColor: "#700D0A",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "APSARA",
  },
  icons: {
    icon: "/icons/icon-512.png",
    shortcut: "/icons/icon-512.png",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "APSARA TEMPLE | Reliques Sacrées & Talismans Mystiques",
    description: "Le sanctuaire des reliques ancestrales et des talismans sacrés.",
    url: "https://apsara-temple.com",
    siteName: "APSARA TEMPLE",
    images: [
      {
        url: "/images/favicon-eye.png",
        width: 512,
        height: 512,
        alt: "APSARA TEMPLE Sacred Eye — Sanctuaire de Reliques Sacrées",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APSARA TEMPLE | Reliques Sacrées & Talismans",
    description: "Découvrez nos reliques sacrées.",
    images: ["/images/favicon-eye.png"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <html lang={locale}>
      <head>
        <link rel="preload" href="/images/apsara-hero-bg.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/talisman.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${cinzel.variable} ${playfair.variable} antialiased`}
      >
        {/* Cinematic Atmospheric Layers */}
        <div className="mist-layer"></div>
        <div className="vignette-layer"></div>
        <div className="grain-overlay"></div>
        
        <CartProvider>
          {children}
        </CartProvider>

        {/* TRACKING SYSTEMS */}
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        )}
        <Clarity />
      </body>

    </html>
  );
}
