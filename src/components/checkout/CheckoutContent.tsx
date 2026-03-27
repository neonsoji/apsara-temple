'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import PaypalButton from './PaypalButton';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

interface CheckoutContentProps {
  locale: string;
  dict: any;
}

export default function CheckoutContent({ locale, dict }: CheckoutContentProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Tracer le début du tunnel (Lead chaud)
  useEffect(() => {
    if (cart.length > 0) {
      sendGAEvent({
        event: 'begin_checkout',
        value: totalPrice,
        currency: 'EUR',
        items: cart.map(item => ({
          item_id: item.id,
          item_name: item.names[locale as 'fr'|'en'],
          price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
          quantity: item.quantity
        }))
      });
    }
  }, []); // Une seule fois au chargement

  const handleSuccess = (details: any) => {
    console.log("Payment Successful:", details);

    // 2. Tracer la conversion finale (Lead transformé)
    sendGAEvent({
      event: 'purchase',
      transaction_id: details.id,
      value: totalPrice,
      currency: 'EUR',
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.names[locale as 'fr'|'en'],
        price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
        quantity: item.quantity
      }))
    });

    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="checkout-success-pane" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
        <div style={{ fontSize: '5rem', color: 'var(--turquoise)', marginBottom: '2rem' }}>✧</div>
        <h2 className="title-sacred" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--ivory)' }}>
          {locale === 'fr' ? 'OFFRANDE REÇUE' : 'OFFERING RECEIVED'}
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '3rem', lineHeight: '1.8' }}>
          {locale === 'fr' 
            ? "L'énergie de votre transaction a été scellée. Nos artisans préparent maintenant l'expédition de vos reliques sacrées. Un message de confirmation a été envoyé à votre adresse rituelle." 
            : "The energy of your transaction has been sealed. Our artisans are now preparing the shipment of your sacred relics. A confirmation message has been sent to your ritual address."}
        </p>
        <Link href={`/${locale}`} className="btn-sacred">
          <span className="btn-label">{locale === 'fr' ? 'RETOURNER AU TEMPLE' : 'RETURN TO TEMPLE'}</span>
          <span className="btn-aura"></span>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty-state">
        <p style={{ marginBottom: '2rem', opacity: 0.6 }}>
          {locale === 'fr' ? "Le vide ne peut être acheté." : "Emptiness cannot be purchased."}
        </p>
        <Link href={`/${locale}`} className="btn-sacred">
          <span className="btn-label">{locale === 'fr' ? 'EXPLORER LES RELIQUES' : 'EXPLORE RELICS'}</span>
          <span className="btn-aura"></span>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-main-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', textAlign: 'left' }}>
      {/* 1. Items Summary */}
      <div className="checkout-relics-list" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '40px', backdropFilter: 'blur(20px)' }}>
        <h3 style={{ fontFamily: 'var(--font-cinzel), serif', letterSpacing: '0.2em', marginBottom: '2rem', borderBottom: '1px solid rgba(253, 250, 241, 0.1)', paddingBottom: '1rem' }}>
          {locale === 'fr' ? 'RÉCAPITULATIF DES RELIQUES' : 'RELICS SUMMARY'}
        </h3>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
            <img src={item.image} alt={item.names[locale as 'fr'|'en']} style={{ width: '60px', height: '60px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{item.names[locale as 'fr'|'en']}</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: '4px 0 0' }}>Quantité: {item.quantity}</p>
            </div>
            <span style={{ fontSize: '0.9rem', color: 'var(--turquoise)' }}>{item.price}</span>
          </div>
        ))}
      </div>

      {/* 2. Payment Action */}
      <div className="checkout-payment-box">
        <div style={{ background: 'rgba(10, 0, 0, 0.4)', border: '1px solid rgba(229, 193, 88, 0.2)', padding: '40px', borderRadius: '2px', position: 'sticky', top: '150px' }}>
          <h3 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>SCELLER L'UNION</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.1rem' }}>
            <span style={{ opacity: 0.5 }}>TOTAL</span>
            <span style={{ color: 'var(--turquoise)', fontWeight: 'bold' }}>{totalPrice.toFixed(2)} €</span>
          </div>

          <PaypalButton 
            amount={totalPrice.toFixed(2)} 
            onSuccess={handleSuccess}
          />

          <p style={{ fontSize: '0.7rem', opacity: 0.3, textAlign: 'center', marginTop: '1.5rem', lineHeight: 1.5 }}>
            {locale === 'fr' 
              ? "En procédant au paiement, vous acceptez les lois secrètes du Temple et les conditions rituelles de vente." 
              : "By proceeding to payment, you accept the secret laws of the Temple and the ritual conditions of sale."}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .checkout-main-layout {
            grid-template-columns: 1fr !important;
          }
          .checkout-payment-box {
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
