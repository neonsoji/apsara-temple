-- ============================================================
-- APSARA TEMPLE — Stock Management Extension
-- ============================================================

-- 1. Add stock management columns to products
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS reserved_stock INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS low_stock_threshold INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS track_stock BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS low_stock_alert_sent BOOLEAN DEFAULT FALSE;

-- 2. Update existing products to have some default stock if needed
-- (Opérationnel : on garde les valeurs actuelles par défaut)

-- 3. Optimization: Index for common admin queries
CREATE INDEX IF NOT EXISTS idx_products_stock_alert 
ON public.products (stock, low_stock_threshold) 
WHERE (track_stock = true);

-- 4. Review RLS for admin access (already handled in base SQL, but ensure consistency)
-- Ensure 'authenticated' role or service_role can read all columns.
