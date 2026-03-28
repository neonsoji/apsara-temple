import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: 'Config missing: ADMIN_PASSWORD not set on server.' }, { status: 500 });
    }

    if (password === adminPassword) {
      // In a real app, use a proper session/JWT
      // Here we use a simple static token for simplicity as requested, 
      // but you can enhance this with a signed value or a UUID stored in Supabase.
      const sessionToken = process.env.ADMIN_SESSION_TOKEN || 'secure_internal_token_99';
      const cookieStore = await cookies();
      cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
