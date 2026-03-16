import { supabase } from "@/lib/supabase";

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, description, price, image, symbol, material, intention");

  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="p-8 text-center text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <h1 className="text-2xl font-semibold text-gray-600">No products found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Our Collection</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {product.image && (
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                <span className="text-lg font-semibold text-emerald-600">
                  ${product.price}
                </span>
              </div>
              
              <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-auto space-y-2 border-t border-gray-50 pt-4 text-xs font-medium text-gray-500">
                {product.symbol && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Symbol:</span>
                    <span className="text-gray-800">{product.symbol}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Material:</span>
                    <span className="text-gray-800">{product.material}</span>
                  </div>
                )}
                {product.intention && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Intention:</span>
                    <span className="text-gray-800 italic text-emerald-700">"{product.intention}"</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
