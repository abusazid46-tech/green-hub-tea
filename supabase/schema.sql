create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  short text not null,
  description text not null,
  price numeric(10, 2) not null default 0,
  image text not null,
  gallery jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  specs jsonb not null default '{}'::jsonb,
  notes jsonb not null default '[]'::jsonb,
  strength integer not null default 50 check (strength between 0 and 100),
  brew jsonb not null default '{}'::jsonb,
  popular boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text not null,
  inquiry_type text not null,
  quantity numeric(10, 2) not null,
  message text not null,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text,
  product_slug text,
  amount numeric(10, 2) not null default 0,
  currency text not null default 'INR',
  status text not null default 'pending' check (status in ('paid', 'pending', 'failed', 'refunded')),
  provider text not null default 'manual',
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.inquiries enable row level security;
alter table public.payments enable row level security;

drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories"
on public.categories
for select
to anon, authenticated
using (active = true);

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (active = true);

drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

create index if not exists categories_active_sort_idx on public.categories(active, sort_order, created_at);
create index if not exists products_active_sort_idx on public.products(active, sort_order, created_at);
create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);
create index if not exists payments_created_at_idx on public.payments(created_at desc);
create index if not exists payments_status_idx on public.payments(status);
