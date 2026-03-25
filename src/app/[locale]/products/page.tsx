import Link from "next/link";
import { getProducts } from "@/services/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <h1 className="text-2xl font-semibold text-gray-600">No products found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Spiritual Collection</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const mainImage = product.product_images?.[0]?.url || "/placeholder.jpg";
          return (
            <Link 
              href={`/${locale}/products/${product.slug}`} 
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-semibold text-emerald-600">
                    {product.price} {product.currency}
                  </span>
                  <span className="text-xs text-gray-400">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
