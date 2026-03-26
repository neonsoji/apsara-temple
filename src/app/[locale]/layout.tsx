import type { Metadata } from "next";
import { Cinzel, Playfair_Display } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/context/CartContext";

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
  title: "APSARA TEMPLE | Reliques Sacrées & Talismans Mystiques",
  description: "Entrez dans le sanctuaire d'APSARA TEMPLE. Découvrez des talismans sacrés, des bracelets bénis et des reliques ancestrales pour incarner votre véritable pouvoir spirituel.",
  openGraph: {
    title: "APSARA TEMPLE | Reliques Sacrées & Talismans",
    description: "Le sanctuaire des reliques ancestrales et des talismans sacrés.",
    url: "https://apsara-temple.com",
    siteName: "APSARA TEMPLE",
    locale: "fr_FR",
    type: "website",
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
      </body>
    </html>
  );
}
