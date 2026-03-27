-- SQL to create the stock_logs table for auditing
CREATE TABLE IF NOT EXISTS public.stock_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    old_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    change INTEGER NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_stock_logs_product_id ON public.stock_logs(product_id);
