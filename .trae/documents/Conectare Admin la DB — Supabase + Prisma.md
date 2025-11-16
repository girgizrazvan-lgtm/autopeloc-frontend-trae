## Ce vom face
- Creăm un user dedicat `prisma` cu permisiuni pe schema `public`
- Obținem stringul de pooling „Supavisor Session” și setăm `DATABASE_URL`
- Rulăm migrarea Prisma și verificăm „Status Sistem” în Admin
- (Opțional) configurăm RLS și cheie de service pentru operațiile admin

## Pași concreți
### 1) Creează userul `prisma` în Supabase
- Deschide Supabase → SQL Editor și rulează:
```
create user "prisma" with password '<PRISMA_PASSWORD>' bypassrls createdb;
grant "prisma" to "postgres";
grant usage on schema public to prisma;
grant create on schema public to prisma;
grant all on all tables in schema public to prisma;
grant all on all routines in schema public to prisma;
grant all on all sequences in schema public to prisma;
alter default privileges for role postgres in schema public grant all on tables to prisma;
alter default privileges for role postgres in schema public grant all on routines to prisma;
alter default privileges for role postgres in schema public grant all on sequences to prisma;
```
- Alege o parolă puternică pentru `<PRISMA_PASSWORD>`

### 2) Obține stringul „Supavisor Session pooler”
- În Supabase Dashboard: Project Settings → Database → „Connection string” / „Connect” → alege Prisma
- Vei vedea hostul de pooling (format: `aws-0-<region>.pooler.supabase.com`) și `project-ref`
- Pentru proiectul tău `project-ref=ndweaccucopjozbbyrsi`, stringul base arată astfel:
```
postgres://prisma.ndweaccucopjozbbyrsi:<PRISMA_PASSWORD>@aws-0-<REGION>.pooler.supabase.com:5432/postgres
```
- Dacă ești în mediu serverless/auto‑scaling, folosește portul 6543 (transaction mode):
```
postgres://prisma.ndweaccucopjozbbyrsi:<PRISMA_PASSWORD>@aws-0-<REGION>.pooler.supabase.com:6543/postgres
```

### 3) Setează `DATABASE_URL`
- În `.env.local` setează:
```
DATABASE_URL="postgres://prisma.ndweaccucopjozbbyrsi:<PRISMA_PASSWORD>@aws-0-<REGION>.pooler.supabase.com:5432/postgres"
```
- Dacă preferi conexiunea directă (fallback), poți folosi:
```
DATABASE_URL="postgresql://prisma:<PRISMA_PASSWORD>@db.ndweaccucopjozbbyrsi.supabase.co:5432/postgres?sslmode=require"
```
- Recomandat: pooling pe `aws-0-<REGION>.pooler.supabase.com`

### 4) Migrarea Prisma
- Repornește proiectul după salvarea `.env.local`
- Rulează migrarea:
```
bash -lc 'set -a; source .env.local; set +a; npx prisma migrate dev --name init'
```
- Verifică statusul:
```
bash -lc 'set -a; source .env.local; set +a; npx prisma migrate status'
```

### 5) Tabele Supabase pentru Admin
- Creează în SQL Editor (dacă nu există):
```
create table if not exists live_visitors (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  current_page text not null,
  page_title text,
  referrer text,
  user_agent text,
  first_seen timestamptz not null default now(),
  last_activity timestamptz not null default now()
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  status text not null default 'pending',
  contact_name text,
  contact_email text,
  contact_phone text,
  user_car_brand text,
  user_car_model text,
  user_car_year int,
  user_car_transmission text,
  city text,
  document_url text,
  document_blob_id text,
  pickup_date timestamptz,
  return_date timestamptz,
  replacement_car_brand text,
  replacement_car_model text,
  replacement_car_category text,
  replacement_car_sipp text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);
```

### 6) RLS / Service Role (opțional, recomandat)
- Varianta sigură: adaugă `SUPABASE_SERVICE_ROLE_KEY` în `.env.local` și vom folosi client server‑side pentru operațiile Admin (`INSERT/UPDATE`)
- Varianta rapidă: creează politici permisive pentru test:
```
alter table live_visitors enable row level security;
create policy lv_read on live_visitors for select using (true);
create policy lv_write on live_visitors for insert with check (true);
create policy lv_update on live_visitors for update using (true) with check (true);

alter table reservations enable row level security;
create policy res_read on reservations for select using (true);
create policy res_update on reservations for update using (true) with check (true);
create policy res_insert on reservations for insert with check (true);
```

## Verificare finală
- Admin → „Status Sistem”: Conexiune „Conectat”, tabele cu număr de înregistrări
- Tab „Vizitatori Live”: nu mai apare eroarea de tabel
- Tab „Rezervări”: listă și acțiuni de status funcționale

## Confirmare
- Confirmă și execut pașii 1–4, apoi 5–6 (după preferința ta pentru RLS: Service role sau politici).