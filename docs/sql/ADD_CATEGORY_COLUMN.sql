-- Ajout de la colonne category manquante dans la table products
-- Sans cette colonne, le filtrage par section (pendentifs, bracelets, etc.) sur la home ne peut pas fonctionner.

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT;

-- On peut aussi ajouter un index pour la performance si besoin
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
