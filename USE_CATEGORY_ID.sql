-- Ajout d'une vraie relation vers la table categories
-- Cela suit la structure recommandée par l'utilisateur (Utilisation de category_id au lieu de category)

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id);

-- Migration des données (Optionnel si on refait la synchro après)
-- Pendentifs -> pendentifs-talismans
-- Bracelets -> chance-destin (ou autre si existante)

-- On peut aussi supprimer la colonne 'category' (TEXT) après si on est sûr, mais on la garde pour le moment pour éviter les bugs.
