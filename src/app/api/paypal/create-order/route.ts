import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const client_id = (process.env.PAYPAL_CLIENT_ID || "").trim();
  const secret = (process.env.PAYPAL_SECRET || "").trim();
  const base = (process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com").trim();

  async function generateAccessToken() {
    if (!client_id || !secret) {
      throw new Error("Missing PayPal Credentials");
    }

    const auth = Buffer.from(`${client_id}:${secret}`).toString("base64");

    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`PayPal Auth Failed: ${data.error_description || data.error}`);
    }
    return data.access_token;
  }

  try {
    const { amount } = await req.json();
    const accessToken = await generateAccessToken();

    const response = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: amount,
            },
            description: "Relique sacrée d'APSARA TEMPLE",
          },
        ],
        application_context: {
          brand_name: "APSARA TEMPLE",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("PayPal Create Order Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
