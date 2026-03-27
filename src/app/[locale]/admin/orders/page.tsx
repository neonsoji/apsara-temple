import React from 'react';

export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-1000">
      <div className="w-16 h-16 rounded-full border border-[#d4af37]/20 flex items-center justify-center mb-6">
        <span className="text-xl">📦</span>
      </div>
      <h2 className="text-2xl font-bold text-[#d4af37] tracking-widest uppercase">Gestion des Commandes</h2>
      <p className="text-[#555] text-sm mt-2 italic font-serif">Module en cours d'incubation...</p>
      
      <div className="mt-10 p-8 border border-dashed border-[#222] rounded-3xl max-w-sm text-center">
        <p className="text-xs text-[#666] leading-relaxed">
          Cette vue permettra prochainement de naviguer dans l'historique complet, d'imprimer les bordereaux d'expédition et de gérer les remboursements.
        </p>
      </div>
    </div>
  );
}
