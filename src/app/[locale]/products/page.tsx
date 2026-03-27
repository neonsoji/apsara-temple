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
                  <span className="text-lg font-semibold text-gray-900">
                    {product.price} {product.currency}
                  </span>
                  <div className="flex flex-col items-end">
                    {product.stock <= 0 ? (
                      <span className="text-[10px] font-bold text-red-500 uppercase">Sold Out</span>
                    ) : product.stock <= (product.low_stock_threshold || 5) ? (
                      <span className="text-[10px] font-bold text-[#d4af37] animate-pulse uppercase">
                        Plus que {product.stock} !
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 uppercase font-medium">In Stock</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
