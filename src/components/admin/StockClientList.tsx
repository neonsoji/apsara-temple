'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  slug: string;
  stock: number;
  reserved_stock: number;
  available_stock: number;
  low_stock_threshold: number;
  status: 'red' | 'orange' | 'green';
  image: string;
}

export default function StockClientList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);

  const handleUpdate = async (productId: string, action: 'increment' | 'decrement' | 'set', value?: number, reason?: string) => {
    // 1. Optimistic UI update
    let oldProducts: Product[] = [];
    setProducts((prev) => {
      oldProducts = [...prev];
      return prev.map(p => {
        if (p.id === productId) {
          let newStock = p.stock;
          if (action === 'increment') newStock += 1;
          else if (action === 'decrement') newStock = Math.max(0, newStock - 1);
          else if (action === 'set') newStock = Math.max(0, value || 0);

          const available = newStock - (p.reserved_stock || 0);
          const low = p.low_stock_threshold || 5;
          const status = available <= 0 ? 'red' : available <= low ? 'orange' : 'green';

          return { ...p, stock: newStock, available_stock: available, status };
        }
        return p;
      });
    });

    try {
      const res = await fetch('/api/admin/stock/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, action, value, reason }),
      });

      if (!res.ok) {
        throw new Error('Update failed');
      }

      const data = await res.json();
      // Ensure local state matches server result (in case of server-side validation)
      setProducts(prev => prev.map(p => 
        p.id === productId 
          ? { ...p, stock: data.newStock, available_stock: data.availableStock } 
          : p
      ));
    } catch (err) {
      console.error('❌ Update failed, rolling back:', err);
      // Rollback on error
      setProducts(oldProducts);
    }
  };

  return (
    <div className="space-y-6">
      {products.map((p) => (
         <ProductControlCard key={p.id} product={p} onUpdate={handleUpdate} />
      ))}
      {products.length === 0 && (
        <div className="text-center py-20 bg-[#111] rounded-3xl border border-dashed border-[#222]">
           <p className="text-[#333] italic text-sm">Aucun produit ne correspond à vos filtres</p>
        </div>
      )}
    </div>
  );
}

function ProductControlCard({ product, onUpdate }: { product: Product, onUpdate: any }) {
  const [inputValue, setInputValue] = useState(product.stock.toString());
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  // S'assure que le champ de saisie se met à jour quand le stock change
  React.useEffect(() => {
    setInputValue(product.stock.toString());
  }, [product.stock]);

  // --- LOGIQUE MÉTIER DES STATUTS ---
  const stock = product.stock || 0;
  const threshold = product.low_stock_threshold || 1;
  const isOut = stock <= 0;
  const isLastPiece = stock === 1;
  const isLow = stock <= threshold;

  let statusLabel = 'DISPONIBLE';
  let statusColor = '#10b981'; // Green (default)

  if (isOut) {
    statusLabel = 'RUPTURE';
    statusColor = '#ef4444'; // Red
  } else if (isLastPiece) {
    statusLabel = 'DERNIÈRE PIÈCE';
    statusColor = '#f59e0b'; // Orange
  } else if (isLow) {
    statusLabel = 'STOCK FAIBLE';
    statusColor = '#f59e0b'; // Orange
  }

  const isLimited = stock <= 3 && stock > 0;
  
  // Déterminer le type (Bracelet / Pendentif)
  const isBracelet = product.slug.toLowerCase().includes('bracelet') || product.name.toLowerCase().includes('bracelet');
  const categoryLabel = isBracelet ? 'BRACELET' : 'PENDENTIF';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val) && val !== product.stock) {
      triggerUpdate('set', val);
    } else {
      setInputValue(product.stock.toString());
    }
  };

  const triggerUpdate = async (action: 'increment' | 'decrement' | 'set', value?: number) => {
    setLoading(true);
    await onUpdate(product.id, action, value, reason || 'Ajustement manuel');
    setLoading(false);
    setReason('');
  };

  return (
    <div className={`bg-[#111] border border-[#222] rounded-[2rem] p-4 md:p-6 transition-all hover:bg-[#141414] border-l-8 ${loading ? 'opacity-50 grayscale' : ''}`} style={{ borderLeftColor: statusColor }}>
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Product Info Section */}
        <div className="flex flex-1 items-center gap-6">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-black shadow-lg flex items-center justify-center">
            <img 
              src={product.image} 
              className="w-full h-full object-cover" 
              alt={categoryLabel} 
            />
            {!product.image.includes('/') && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-[#333] font-bold">{categoryLabel}</span>
            )}
            
            {/* Badge Edition Limitée */}
            {isLimited && (
              <div className="absolute top-1 left-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-black text-[#d4af37] border border-[#d4af37]/20 tracking-tighter">
                LIMITÉE
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase text-[#555] font-black tracking-widest mb-1">{categoryLabel}</div>
            <div className="text-sm font-black truncate text-white uppercase tracking-wider mb-3">{product.name}</div>
            
            <div className="flex items-center gap-3">
               <div className="text-[9px] px-2 py-0.5 rounded-full border border-white/5 font-black tracking-widest" style={{ color: statusColor, backgroundColor: `${statusColor}10` }}>
                 {statusLabel}
               </div>
               {stock > 0 && (
                 <span className="text-[10px] text-[#444] font-black italic">{stock} pièces dispos</span>
               )}
            </div>
            
            <div className="mt-4 flex items-baseline gap-2">
               <span className="text-3xl font-black tabular-nums tracking-tighter" style={{ color: statusColor }}>{stock}</span>
               <span className="text-[9px] uppercase font-bold text-[#444]">en stock</span>
            </div>
          </div>
        </div>

        {/* Action Controls Section */}
        <div className="flex flex-col gap-3 justify-center min-w-[280px]">
           <div className="flex items-center gap-2">
              {/* Bouton décrémenter (désactivé si 0) */}
              <button 
                disabled={loading || stock <= 0}
                onClick={() => triggerUpdate('decrement')}
                className="w-12 h-12 rounded-xl border border-[#222] flex items-center justify-center text-xl font-bold hover:bg-[#222] transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              >
                —
              </button>
              
              <div className="relative flex-1 group">
                <input 
                   disabled={loading}
                   type="number"
                   value={inputValue}
                   onChange={handleInputChange}
                   onBlur={handleInputBlur}
                   className="w-full h-12 bg-black border border-[#222] rounded-xl text-center font-black text-lg focus:outline-none focus:border-[#d4af37] transition-all disabled:opacity-50"
                />
              </div>

              {/* Bouton incrémenter */}
              <button 
                disabled={loading}
                onClick={() => triggerUpdate('increment')}
                className="w-12 h-12 rounded-xl bg-[#222] text-[#d4af37] flex items-center justify-center text-xl font-bold hover:bg-[#d4af37] hover:text-black transition-all disabled:opacity-30"
              >
                +
              </button>
           </div>

           {/* Reason Input */}
           <div className="relative">
              <input 
                 disabled={loading}
                 value={reason}
                 onChange={(e) => setReason(e.target.value)}
                 placeholder="Annoter la modif..." 
                 className="w-full bg-transparent border-b border-[#1a1a1a] py-2 text-[10px] text-[#444] focus:outline-none focus:border-[#d4af37] placeholder:text-[#222] transition-colors italic"
              />
           </div>
        </div>

      </div>
    </div>
  );
}
