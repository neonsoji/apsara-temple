import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/home/Hero"
import ProductGrid from "@/components/home/ProductGrid"
import Story from "@/components/home/Story"
import Footer from "@/components/layout/Footer"
import Separator from "@/components/home/Separator"

export default function Home() {
  return (
    <main>
      {/* 1) TOP HEADER / MENU */}
      <Navbar />

      {/* 2) HERO SECTION (Two-column layout, shop-first) */}
      <Hero />

      {/* 3) SHOP-FIRST PRODUCT SECTION (Directly follows hero) */}
      <div className="homepage-shop">
        <ProductGrid />
      </div>

      {/* 4) REFINED TRANSITION TO STORY */}
      <Separator />

      {/* 5) STORY SECTION */}
      <Story />

      {/* 6) FOOTER */}
      <Footer />
    </main>
  )
}
