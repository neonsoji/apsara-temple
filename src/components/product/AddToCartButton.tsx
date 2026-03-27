'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/products';
import { useRouter, useParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';

interface AddToCartButtonProps {
  product: Product;
  label: string;
}

export default function AddToCartButton({ product, label }: AddToCartButtonProps) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'fr';

  // Vérifier combien on en a déjà dans le panier
  const cartItem = cart.find(item => item.id === product.id);
  const currentQtyInCart = cartItem ? cartItem.quantity : 0;
  
  // Désactivé si stock total est 0 OU si on a déjà tout pris dans le panier
  const isOutOfStock = product.stock <= 0;
  const isFull = currentQtyInCart >= product.stock;

  return (
    <button 
      className={`btn-sacred ${(isOutOfStock || isFull) ? 'disabled-sacred' : ''}`}
      disabled={isOutOfStock || isFull}
      onClick={() => {
        if (isOutOfStock || isFull) return;
        addToCart(product);

        // Tracking du lead (Intérêt produit)
        const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ''));
        sendGAEvent({
          event: 'add_to_cart',
          value: priceNum,
          currency: 'EUR',
          items: [{
            item_id: product.id,
            item_name: product.names[locale as 'fr'|'en'],
            price: priceNum,
            quantity: 1
          }]
        });

        router.push(`/${locale}/cart`);
      }}
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
