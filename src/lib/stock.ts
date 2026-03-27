import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function updateProductStock(items: any[]) {
  const stockAlerts: string[] = [];

  for (const item of items) {
    try {
      // 1. Fetch current product info
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('id, name, stock, track_stock, low_stock_threshold, low_stock_alert_sent')
        .eq('slug', item.slug)
        .single();

      if (fetchError || !product || !product.track_stock) continue;

      // 2. Decrement stock
      const newStock = Math.max(0, (product.stock || 0) - item.quantity);
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', product.id);

      if (updateError) {
        console.error(`❌ Error updating stock for ${product.name}:`, updateError.message);
        continue;
      }

      // 3. Check for alerts
      if (newStock <= (product.low_stock_threshold || 5)) {
        if (!product.low_stock_alert_sent || newStock === 0) {
          stockAlerts.push(
            `📦 <b>${product.name}</b> : ${newStock === 0 ? '<span style="color:red">EN RUPTURE</span>' : `Stock faible (${newStock} restants)`}`
          );
          
          // Reset check mark so we don't alert multiple times (except for rupture)
          await supabase
            .from('products')
            .update({ low_stock_alert_sent: true })
            .eq('id', product.id);
        }
      }
    } catch (err) {
      console.error('❌ Stock logic error:', err);
    }
  }

  return stockAlerts;
}

export async function sendStockAlertEmail(alerts: string[]) {
  if (alerts.length === 0 || !process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return;

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fee2e2; border-radius: 8px; background: #fff;">
      <h2 style="color: #b91c1c; border-bottom: 2px solid #fee2e2; padding-bottom: 10px;">⚠️ Alerte de Stock — APSARA TEMPLE</h2>
      <p>Certains produits nécessitent votre attention immédiate :</p>
      <ul style="list-style: none; padding: 0;">
        ${alerts.map(a => `<li style="padding: 12px; margin-bottom: 8px; background: #fef2f2; border-radius: 6px; border-left: 4px solid #ef4444;">${a}</li>`).join('')}
      </ul>
      <div style="margin-top: 25px; text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/stock" style="background: #b91c1c; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Gérer le stock</a>
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Apsara Temple Cockpit <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `⚠️ Alerte Stock : ${alerts.length} produit(s) critique(s)`,
        html: htmlContent
      })
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('❌ Resend stock alert error:', error);
    }
  } catch (err) {
    console.error('❌ Unexpected error sending stock alert:', err);
  }
}
