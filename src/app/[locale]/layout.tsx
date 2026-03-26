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
  metadataBase: new URL("https://apsara-temple.com"),
  title: "APSARA TEMPLE | Reliques Sacrées & Talismans Mystiques",
  description: "Entrez dans le sanctuaire d'APSARA TEMPLE. Découvrez des talismans sacrés, des bracelets bénis et des reliques ancestrales pour incarner votre véritable pouvoir spirituel.",
  icons: {
    icon: "/images/favicon-eye.png",
    shortcut: "/images/favicon-eye.png",
    apple: "/images/favicon-eye.png",
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
        alt: "APSARA TEMPLE Sacred Eye",
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
