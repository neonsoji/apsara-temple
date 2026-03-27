import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updateProductStock, sendStockAlertEmail } from '@/lib/stock';

// Instanciation déplacée dans POST pour éviter le crash de "next build" sur Vercel si la clé manque
export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'missing_url',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing_key'
  );

  const client_id = (process.env.PAYPAL_CLIENT_ID || '').trim();
  const secret = (process.env.PAYPAL_SECRET || '').trim();
  const base = (process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com').trim();

  async function generateAccessToken() {
    if (!client_id || !secret) throw new Error('Missing PayPal Credentials');
    const auth = Buffer.from(`${client_id}:${secret}`).toString('base64');
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data.access_token;
  }

  try {
    const { orderID, cartItems } = await req.json();
    const accessToken = await generateAccessToken();

    // 1. Capturer le paiement PayPal
    const response = await fetch(`${base}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // 2. Extraire toutes les infos de la réponse PayPal
    const purchaseUnit = data.purchase_units?.[0];
    const shipping = purchaseUnit?.shipping;
    const payer = data.payer;
    const captureId = purchaseUnit?.payments?.captures?.[0]?.id;

    // Adresse de livraison complète (fournie par PayPal)
    const addr = shipping?.address || {};

    // 3. Sauvegarder la commande dans Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        paypal_order_id: orderID,

        // Infos client
        customer_email: payer?.email_address || '',
        customer_name: `${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}`.trim(),

        // Adresse de livraison PayPal
        shipping_full_name: shipping?.name?.full_name || '',
        shipping_address_line1: addr.address_line_1 || '',
        shipping_address_line2: addr.address_line_2 || '',
        shipping_city: addr.admin_area_2 || '',
        shipping_state: addr.admin_area_1 || '',
        shipping_postal_code: addr.postal_code || '',
        shipping_country_code: addr.country_code || '',

        // Montant
        total: parseFloat(purchaseUnit?.amount?.value || '0'),
        currency: purchaseUnit?.amount?.currency_code || 'EUR',
        status: 'paid',
      })
      .select()
      .single();

    if (orderError) {
      console.error('❌ Supabase order insert error:', orderError.message, '| code:', orderError.code);
      // On renvoie quand même le succès PayPal — on ne bloque pas le client
    }

    // 4. Sauvegarder les articles de la commande
    if (order && cartItems && cartItems.length > 0) {
      const orderItemsToInsert = cartItems.map((item: any) => ({
        order_id: order.id,
        product_id: String(item.id),   // cast en TEXT (compatible colonne TEXT Supabase)
        product_slug: item.slug,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: parseFloat(item.unit_price || '0'),
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItemsToInsert);
      if (itemsError) {
        console.error('❌ Supabase order_items insert error:', itemsError.message, '| code:', itemsError.code);
      }
    }

    console.log(`✅ Commande sauvegardée — Client: ${payer?.email_address} | Expédition: ${shipping?.name?.full_name}`);

    // ==========================================
    // 📩 5. NOTIFICATION EMAIL AUTOMATIQUE (RESEND)
    // ==========================================
    try {
      if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
        // Formatage des articles pour l'email
        const itemsListHTML = cartItems?.map((item: any) => 
          `<li style="margin-bottom: 8px;"><b>${item.quantity}x</b> ${item.name} <br/><span style="color: #666; font-size: 0.9em;">(${parseFloat(item.unit_price || '0').toFixed(2)} €)</span></li>`
        ).join('') || 'Aucun article spécifié';

        // Total
        const totalAmount = parseFloat(purchaseUnit?.amount?.value || '0').toFixed(2);
        const currency = purchaseUnit?.amount?.currency_code || 'EUR';

        // Modèle HTML simple et propre
        const htmlContent = `
          <div style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #d4af37; border-bottom: 1px solid #eee; padding-bottom: 15px;">Nouvelle commande Apsara Temple 🎉 n° ${orderID}</h2>
            
            <h3 style="margin-top: 25px;">👤 Client</h3>
            <p style="background: #fdfdfd; padding: 10px; border-radius: 4px; border-left: 3px solid #d4af37;">
              Nom : <b>${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}</b><br/>
              Email : <a href="mailto:${payer?.email_address}" style="color: #d4af37;">${payer?.email_address}</a>
            </p>

            <h3 style="margin-top: 25px;">📍 Adresse de Livraison</h3>
            <p style="background: #fdfdfd; padding: 10px; border-radius: 4px; border-left: 3px solid #d4af37;">
              <b>${shipping?.name?.full_name || ''}</b><br/>
              ${addr.address_line_1 || ''} ${addr.address_line_2 ? '<br/>' + addr.address_line_2 : ''}<br/>
              ${addr.postal_code || ''} ${addr.admin_area_2 || ''}<br/>
              ${addr.country_code || ''}
            </p>

            <h3 style="margin-top: 25px;">🛒 Détails de la commande</h3>
            <ul style="padding-left: 20px;">
              ${itemsListHTML}
            </ul>
            
            <div style="margin-top: 30px; padding: 15px; background: #fafafa; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0; color: #111;">💰 Total : ${totalAmount} ${currency}</h2>
            </div>
          </div>
        `;

        // Envoi de l'email via l'API Resend
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Apsara Temple <onboarding@resend.dev>', // Email par défaut Resend
            to: process.env.ADMIN_EMAIL,
            subject: `Nouvelle commande ! ${totalAmount} ${currency} - ${payer?.name?.given_name || ''}`,
            html: htmlContent
          })
        });

        if (!resendRes.ok) {
          const resendError = await resendRes.json();
          console.error("⚠️ Erreur API Resend :", resendError);
        } else {
          console.log(`📩 Notification email envoyée avec succès à ${process.env.ADMIN_EMAIL}`);
        }

      } else {
        console.warn("⚠️ Email ignoré : RESEND_API_KEY ou ADMIN_EMAIL manquants dans .env.local");
      }
    } catch (emailError) {
      // On loggue simplement l'erreur, sans bloquer la finalisation de la commande
      console.error('❌ Erreur inattendue lors de l\'envoi de la notification :', emailError);
    }
    // ==========================================

    // ==========================================
    // 📦 6. GESTION DU STOCK ET ALERTES
    // ==========================================
    try {
      if (cartItems && cartItems.length > 0) {
        const alerts = await updateProductStock(cartItems);
        if (alerts.length > 0) {
          await sendStockAlertEmail(alerts);
        }
      }
    } catch (stockError) {
      console.error('❌ Erreur lors de la mise à jour du stock :', stockError);
    }
    // ==========================================

    return NextResponse.json(data);

  } catch (error) {
    console.error('PayPal Capture Order Error:', error);
    return NextResponse.json({ error: 'Failed to capture order' }, { status: 500 });
  }
}
