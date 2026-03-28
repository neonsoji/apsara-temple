-- Commande pour forcer le rechargement du cache Supabase (PostgREST)
-- Si vous avez des erreurs type "PGRST204" (table non trouvée), lancez ceci.

NOTIFY pgrst, 'reload schema';
