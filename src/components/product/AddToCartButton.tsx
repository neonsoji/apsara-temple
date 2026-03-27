'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { DBProduct } from '@/services/products';
import { useRouter, useParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';

interface AddToCartButtonProps {
  product: DBProduct;
  label: string;
}

export default function AddToCartButton({ product, label }: AddToCartButtonProps) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'fr';

  // Vérifier combien on en a déjà dans le panier
  const cartItem = cart.find(item => item.id === product.id);
  const currentQtyInCart = (cartItem as any)?.quantity || 0;
  
  // Désactivé si stock total est 0 OU si on a déjà tout pris dans le panier
  const isOutOfStock = product.stock <= 0;
  const isFull = currentQtyInCart >= product.stock;

  const productName = locale === 'en' ? (product.name_en || product.name) : product.name;

  const handleAddToCart = () => {
    if (isOutOfStock || isFull) return;
    
    // Mapping format DB -> format Panier (compatible avec CartContext)
    const cartProduct = {
      id: product.id,
      slug: product.slug,
      price: `${product.price.toFixed(2)} €`,
      image: product.image || '',
      names: { fr: product.name, en: product.name_en || product.name },
      stock: product.stock
    };

    addToCart(cartProduct as any);

    // Tracking du lead (Intérêt produit)
    sendGAEvent({
      event: 'add_to_cart',
      value: product.price,
      currency: 'EUR',
      items: [{
        item_id: product.id,
        item_name: productName,
        price: product.price,
        quantity: 1
      }]
    });

    router.push(`/${locale}/cart`);
  };

  return (
    <button 
      className={`btn-sacred ${(isOutOfStock || isFull) ? 'disabled-sacred' : ''}`}
      disabled={isOutOfStock || isFull}
      onClick={handleAddToCart}
      style={(isOutOfStock || isFull) ? { opacity: 0.5, cursor: 'not-allowed', filter: 'grayscale(1)' } : {}}
    >
      <span className="btn-label">
        {isOutOfStock ? (locale === 'fr' ? 'ÉPUISÉE' : 'SOLD OUT') : 
         isFull ? (locale === 'fr' ? 'LIMITE ATTEINTE' : 'MAX REACHED') : label}
      </span>
      <span className="btn-aura"></span>
    </button>
  );
}
