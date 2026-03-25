'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/products';
import { useRouter, useParams } from 'next/navigation';

interface AddToCartButtonProps {
  product: Product;
  label: string;
}

export default function AddToCartButton({ product, label }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'fr';

  return (
    <button 
      className="btn-sacred"
      onClick={() => {
        addToCart(product);
        router.push(`/${locale}/cart`);
      }}
    >
      <span className="btn-label">{label}</span>
      <span className="btn-aura"></span>
    </button>
  );
}
