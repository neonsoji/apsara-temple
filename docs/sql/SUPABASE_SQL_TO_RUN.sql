-- ============================================================
-- APSARA TEMPLE — Supabase Infrastructure SQL
-- À exécuter dans Supabase → SQL Editor
-- ============================================================

-- 1. Create tables for E-commerce Infrastructure

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    stock INTEGER DEFAULT 0,
    category TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Product Images Table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    position INTEGER DEFAULT 0
);

-- Orders Table (avec adresse de livraison complète)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paypal_order_id TEXT UNIQUE,           -- ID de la transaction PayPal

    -- Informations client
    customer_email TEXT NOT NULL,
    customer_name TEXT,

    -- Adresse de livraison (récupérée depuis PayPal)
    shipping_full_name TEXT,
    shipping_address_line1 TEXT,
    shipping_address_line2 TEXT,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_postal_code TEXT,
    shipping_country_code TEXT,

    -- Financier
    total NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EUR',

    -- Statut de la commande
    status TEXT DEFAULT 'paid', -- paid, shipped, delivered, cancelled

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order Items Table (les produits commandés)
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT,          -- ID du produit (identifiant local)
    product_slug TEXT,        -- Slug pour retrouver le produit
    product_name TEXT,        -- Nom au moment de la commande (archive)
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL
);

-- 2. Row Level Security (RLS) Configuration

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public products are viewable by everyone" ON public.products;
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (active = true);
DROP POLICY IF EXISTS "Admin has full access to products" ON public.products;
CREATE POLICY "Admin has full access to products" ON public.products ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public images are viewable by everyone" ON public.product_images;
CREATE POLICY "Public images are viewable by everyone" ON public.product_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin has full access to product_images" ON public.product_images;
CREATE POLICY "Admin has full access to product_images" ON public.product_images ALL USING (auth.role() = 'authenticated');

-- Orders : insertion publique (le client non connecté peut passer commande)
-- Lecture : UNIQUEMENT pour les admins
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
CREATE POLICY "Anyone can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin has full access to orders" ON public.orders;
CREATE POLICY "Admin has full access to orders" ON public.orders ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;
CREATE POLICY "Anyone can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin has full access to order_items" ON public.order_items;
CREATE POLICY "Admin has full access to order_items" ON public.order_items ALL USING (auth.role() = 'authenticated');
