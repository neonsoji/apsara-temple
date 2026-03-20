import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Props {
  locale: string;
  dictNav: any;
  dictFooter: any;
  title: string;
}

export default function UnderConstruction({ locale, dictNav, dictFooter, title }: Props) {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "url('/images/apsara-hero-bg.webp') center/cover no-repeat" }}>
      <Navbar locale={locale} dict={dictNav} />
      
      <section style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "150px 20px" }}>
        
        <div style={{ background: "rgba(15, 8, 8, 0.7)", padding: "60px", borderRadius: "8px", border: "1px solid rgba(175, 155, 125, 0.3)", backdropFilter: "blur(15px)", textAlign: "center", maxWidth: "800px" }}>
          <div style={{ fontSize: "2rem", color: "var(--gold-glow)", marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
             <span>✧</span><span>✦</span><span>✧</span>
          </div>
          
          <h1 style={{ fontFamily: "var(--font-cinzel)", color: "var(--ivory)", fontSize: "2.5rem", letterSpacing: "0.2em", marginBottom: "30px", textTransform: "uppercase" }}>
            {title}
          </h1>
          
          <p style={{ fontFamily: "var(--font-playfair)", color: "var(--ivory)", opacity: 0.8, fontSize: "1.2rem", lineHeight: 1.8, marginBottom: "40px", letterSpacing: "0.05em" }}>
            {locale === 'fr' 
              ? "L'accès à ce sanctuaire est momentanément scellé. Les maîtres-artisans du Temple sont en train de restaurer ces espaces sacrés pour vous offrir une expérience d'une pureté absolue."
              : "Access to this sanctuary is temporarily sealed. The Temple's master artisans are restoring these sacred spaces to offer you an experience of absolute purity."
            }
          </p>
          
          <div style={{ fontSize: "0.8rem", letterSpacing: "0.4em", color: "var(--turquoise)", textTransform: "uppercase" }}>
            {locale === 'fr' ? "Restauration en cours" : "Restoration in progress"}
          </div>
        </div>

      </section>

      <Footer dict={dictFooter} />
    </main>
  );
}
