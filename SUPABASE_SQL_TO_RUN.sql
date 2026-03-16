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

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT DEFAULT 'pending', -- pending, paid, shipped, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
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

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin has full access to orders" ON public.orders;
CREATE POLICY "Admin has full access to orders" ON public.orders ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert their own order items" ON public.order_items;
CREATE POLICY "Users can insert their own order items" ON public.order_items FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin has full access to order_items" ON public.order_items;
CREATE POLICY "Admin has full access to order_items" ON public.order_items ALL USING (auth.role() = 'authenticated');
