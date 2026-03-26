"use client";

import { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
  amount: string | number;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

export default function PaypalButton({ amount, onSuccess, onError }: PaypalButtonProps) {
  const [isMounted, setIsMounted] = useState(false);
  const rawClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientId = rawClientId ? rawClientId.trim() : "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory)', opacity: 0.3 }}>Connexion au Portail...</div>;

  if (!clientId || clientId === "XXX") {
    return (
      <div style={{ color: "#ff9900", padding: "10px", fontSize: "0.8rem", textAlign: 'center' }}>
        Configuration du paiement en cours...
      </div>
    );
  }

  return (
    <div className="paypal-gate" style={{ minHeight: "150px", width: '100%' }}>
      <PayPalScriptProvider
        options={{
          clientId: clientId,
          currency: "EUR",
          intent: "capture",
          components: "buttons",
        }}
      >
        <PayPalButtons
          style={{ 
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "checkout",
          }}
          forceReRender={[amount, clientId]}
          createOrder={async () => {
             const res = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: String(amount) }),
             });
             const data = await res.json();
             if (!data.id) throw new Error("Erreur PayPal API");
             return data.id;
          }}
          onApprove={async (data) => {
             const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
             });
             const captureData = await res.json();
             if (onSuccess) onSuccess(captureData);
          }}
          onError={(err) => {
            console.error("PayPal Error:", err);
            if (onError) onError(err);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
