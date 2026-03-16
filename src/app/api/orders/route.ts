import { NextResponse } from "next/server";
import { createOrder, addOrderItems } from "@/services/orders";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, total, currency, items } = body;

    // 1. Validate input
    if (!email || !total || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Create order
    const order = await createOrder({
      email,
      total,
      currency: currency || "EUR",
      status: "pending",
    });

    // 3. Create order items
    await addOrderItems(order.id, items);

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
