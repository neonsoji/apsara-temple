-- APSARA Temple — hardening Supabase RLS
-- No direct table access is required from anon/authenticated.
begin;

alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

do $$
begin
  if to_regclass('public.stock_logs') is not null then
    execute 'alter table public.stock_logs enable row level security';
  end if;
end $$;

revoke all on table public.products from anon, authenticated;
revoke all on table public.categories from anon, authenticated;
revoke all on table public.orders from anon, authenticated;
revoke all on table public.order_items from anon, authenticated;

do $$
begin
  if to_regclass('public.stock_logs') is not null then
    execute 'revoke all on table public.stock_logs from anon, authenticated';
  end if;
end $$;

commit;

-- Verification
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('products','categories','orders','order_items','stock_logs')
order by tablename;
