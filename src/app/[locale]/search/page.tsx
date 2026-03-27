import { getAllProducts } from '@/lib/products';
import SearchClient from './SearchClient';

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const products = await getAllProducts();

  return (
    <SearchClient locale={locale} products={products} />
  );
}
