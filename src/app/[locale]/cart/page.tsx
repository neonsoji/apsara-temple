'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import './Cart.css';

export default function CartPage({ params }: { params: any }) {
  const { locale } = React.use(params) as any;
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="cart-page-container">
      <Navbar locale={locale} dict={{}} />
      
      <section className="cart-hero">
        <div className="cart-mist"></div>
        <div className="cart-content">
          <h1 className="cart-title title-sacred">VOTRE PANIER SACRÉ</h1>
          <p className="cart-subtitle">{totalItems} {totalItems > 1 ? 'Reliques en attente' : 'Relique en attente'}</p>
        </div>
      </section>

      <section className="cart-items-section">
        <div className="cart-container-main">
          {cart.length > 0 ? (
            <div className="cart-content-grid">
              <div className="cart-items-list">
                {cart.map(item => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.names[locale as 'fr'|'en']} />
                    </div>
                    <div className="cart-item-info">
                      <Link href={`/${locale}/products/${item.slug}`} className="cart-item-name">
                        {item.names[locale as 'fr'|'en']}
                      </Link>
                      <div className="cart-item-price-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
                        <p className="cart-item-price" style={{ margin: 0 }}>
                          {item.price} 
                        </p>
                        <div className="cart-quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '5px 15px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'var(--ivory)', fontSize: '1.2rem', cursor: 'pointer' }}>−</button>
  <span style={{ color: 'var(--ivory)', fontSize: '1.1rem', fontWeight: 'bold' }}>{item.quantity}</span>
  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'var(--ivory)', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
</div>
                      </div>
                      <button 
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <span style={{ marginRight: '8px', opacity: 0.7 }}>✕</span>
                        {locale === 'fr' ? 'DISSOUDRE CE LIEN' : 'DISSOLVE THIS BOND'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary-pane">
                <div className="summary-box">
                  <h3>TOTAL DE L'OFFRANDE</h3>
                  <div className="summary-line">
                    <span>Sous-total</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="summary-line">
                    <span>Expéditionrituelle</span>
                    <span>OFFERTE</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-line total-price">
                    <span>TOTAL</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <Link href={`/${locale}/checkout`} className="checkout-btn btn-sacred" style={{ textDecoration: 'none' }}>
                    <span className="btn-label">{locale === 'fr' ? 'PROCÉDER À L\'ACTION' : 'PROCEED TO ACTION'}</span>
                    <span className="btn-aura"></span>
                  </Link>
                  <p className="checkout-note">Paiement sécurisé via le Temple Secret</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart-state">
              <div className="empty-symbol">✧</div>
              <p>{locale === 'fr' ? "Votre panier est vide comme le silence du désert." : "Your cart is as empty as the desert's silence."}</p>
              <Link href={`/${locale}`} className="back-to-shop">RETOURNER AUX RELIQUES</Link>
            </div>
          )}
        </div>
      </section>

      <Footer dict={{}} locale={locale} />
    </div>
  );
}






