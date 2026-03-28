-- Mise à jour globale des seuils de stock pour une gestion cohérente
UPDATE public.products SET low_stock_threshold = 1;

-- On s'assure que track_stock est activé pour tous
UPDATE public.products SET track_stock = true;
