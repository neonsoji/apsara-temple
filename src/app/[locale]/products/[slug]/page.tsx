import { getProductBySlug } from "@/services/products";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={product.product_images?.[0]?.url || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.product_images?.slice(1).map((img: any) => (
              <div key={img.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={img.url} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-sm text-emerald-600 font-medium tracking-wide uppercase mb-6">
            {product.category}
          </p>
          
          <div className="text-3xl font-light text-gray-900 mb-8 font-mono">
            {product.price} {product.currency}
          </div>

          <div className="prose prose-sm text-gray-600 mb-8 border-t border-b border-gray-100 py-8">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <button className="flex-1 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-xs text-gray-400 space-y-2">
            <p>Weight: 150g</p>
            <p>SKU: {product.slug.toUpperCase()}-{product.id.slice(0, 4)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
