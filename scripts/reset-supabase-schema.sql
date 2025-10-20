-- Reset Supabase schema for new project
-- Run this in the Supabase SQL editor of the NEW project
-- It drops existing tables (if any) and recreates them to match this frontend

-- Extensions
create extension if not exists pgcrypto;

-- Drop tables if they exist (respecting FKs)
drop table if exists booking_funnel_steps cascade;
drop table if exists reservations cascade;
drop table if exists booking_sessions cascade;
drop table if exists sessions cascade;
drop table if exists users cascade;

-- USERS table
create table public.users (
  id uuid primary key default gen_random_uuid(),
  auth0_id text,
  email text not null,
  name text,
  role text default 'user',
  company text,
  status text default 'pending',
  password_hash text,
  org_id uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists users_email_idx on public.users (email);
create index if not exists users_role_idx on public.users (role);
create index if not exists users_status_idx on public.users (status);

-- SESSIONS table (for internal session management in lib/auth-utils.ts)
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  token text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);
create index if not exists sessions_user_id_idx on public.sessions (user_id);
create index if not exists sessions_token_idx on public.sessions (token);

-- BOOKING SESSIONS table
create table public.booking_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists booking_sessions_created_at_idx on public.booking_sessions (created_at);

-- BOOKING FUNNEL STEPS table
create table public.booking_funnel_steps (
  id uuid primary key default gen_random_uuid(),
  session_id text not null references public.booking_sessions(session_id) on delete cascade,
  step_number int not null check (step_number in (1,2,3)),
  step_name text not null,
  step_data jsonb,
  completed_at timestamptz default now(),
  unique (session_id, step_number)
);
create index if not exists booking_funnel_steps_session_id_idx on public.booking_funnel_steps (session_id);
create index if not exists booking_funnel_steps_step_number_idx on public.booking_funnel_steps (step_number);
create index if not exists booking_funnel_steps_completed_at_idx on public.booking_funnel_steps (completed_at);

-- RESERVATIONS table (aligned with app/api/booking/create-reservation)
create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  source text default 'website',
  -- contact info
  contact_name text,
  contact_phone text,
  contact_email text,
  -- user car info
  user_car_brand text,
  user_car_model text,
  user_car_year int,
  user_car_transmission text,
  -- location
  city text,
  -- documents
  document_url text,
  document_blob_id text,
  -- dates
  pickup_date date,
  return_date date,
  -- requested replacement car
  replacement_car_brand text,
  replacement_car_model text,
  replacement_car_category text,
  replacement_car_sipp text,
  -- meta
  status text default 'pending',
  synced_to_admin boolean default false,
  admin_sync_at timestamptz,
  admin_reservation_id text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists reservations_session_id_idx on public.reservations (session_id);
create index if not exists reservations_status_idx on public.reservations (status);
create index if not exists reservations_created_at_idx on public.reservations (created_at);

-- Updated-at trigger for tables that have updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Attach triggers
create trigger users_set_updated_at before update on public.users
for each row execute function public.set_updated_at();

create trigger booking_sessions_set_updated_at before update on public.booking_sessions
for each row execute function public.set_updated_at();

create trigger reservations_set_updated_at before update on public.reservations
for each row execute function public.set_updated_at();

-- Row Level Security
-- Enabled RLS with permissive policies for website anon operations.
-- Tighten these in production and prefer service role on admin.
alter table public.booking_sessions enable row level security;
alter table public.booking_funnel_steps enable row level security;
alter table public.reservations enable row level security;

-- booking_sessions: allow insert/select/update for anon & authenticated roles
create policy booking_sessions_insert on public.booking_sessions
  for insert to anon, authenticated with check (true);
create policy booking_sessions_select on public.booking_sessions
  for select to anon, authenticated using (true);
create policy booking_sessions_update on public.booking_sessions
  for update to anon, authenticated using (true) with check (true);

-- booking_funnel_steps: allow insert/select for anon & authenticated roles
create policy booking_funnel_steps_insert on public.booking_funnel_steps
  for insert to anon, authenticated with check (true);
create policy booking_funnel_steps_select on public.booking_funnel_steps
  for select to anon, authenticated using (true);

-- reservations: allow insert/select/update for anon & authenticated roles
create policy reservations_insert on public.reservations
  for insert to anon, authenticated with check (true);
create policy reservations_select on public.reservations
  for select to anon, authenticated using (true);
create policy reservations_update on public.reservations
  for update to anon, authenticated using (true) with check (true);

-- Done.