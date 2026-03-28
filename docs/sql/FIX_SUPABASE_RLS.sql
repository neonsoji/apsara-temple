-- 1. Ensure RLS is either disabled OR has a broad SELECT policy for the cockpit
-- Option A: Broad policy
CREATE POLICY "Allow public read for products" 
ON public.products 
FOR SELECT 
USING (true);

-- Option B: If the service role is used (which we do in the cockpit), it bypasses RLS anyway.
-- But if RLS is enabled and misconfigured, it might cause issues. 
-- Just in case, let's make it explicit.
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read for products" ON public.products;
CREATE POLICY "Allow public read for products" ON public.products FOR SELECT USING (true);
