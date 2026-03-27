import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ [SUPABASE] Missing env variables in stock-update');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { productId, action, value, reason } = await req.json();

    if (!productId || !action) {
      return NextResponse.json({ error: 'Missing productId or action' }, { status: 400 });
    }

    // 1. Get current stock
    const { data: product, error: getError } = await supabase
      .from('products')
      .select('id, stock, name')
      .eq('id', productId)
      .single();

    if (getError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const oldStock = product.stock || 0;
    let newStock = oldStock;

    // 2. Calculate new stock
    if (action === 'increment') {
      newStock = oldStock + 1;
    } else if (action === 'decrement') {
      newStock = Math.max(0, oldStock - 1);
    } else if (action === 'set') {
      newStock = Math.max(0, Number(value) || 0);
    }

    const change = newStock - oldStock;

    // 3. Update Supabase
    const { data: updatedProduct, error: updateError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', productId)
      .select('id, stock, reserved_stock, low_stock_threshold')
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 4. Log the change (Fire and forget or wait)
    // We try to log it but we return the success even if logging fails
    try {
      await supabase.from('stock_logs').insert({
        product_id: productId,
        old_stock: oldStock,
        new_stock: newStock,
        change: change,
        reason: reason || 'Ajustement manuel admin'
      });
    } catch (logErr) {
      console.error('❌ Failed to log stock change:', logErr);
    }

    return NextResponse.json({ 
      success: true, 
      newStock: updatedProduct.stock,
      availableStock: updatedProduct.stock - (updatedProduct.reserved_stock || 0)
    });

  } catch (err) {
    console.error('❌ Stock update error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
