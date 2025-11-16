## Obiectiv
- Configurăm corect conexiunile la DB pentru Admin
- Asigurăm tabelele și politicile necesare în Supabase
- Rulăm migrarea Prisma și verificăm Status Sistem

## Pasul 1: Variabile de mediu (Supabase)
- Adaugă în `.env.local` (dacă nu există deja):
  - `NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>`
- Acestea se găsesc în Supabase → Project Settings → API.

## Pasul 2: Conexiunea Prisma (Postgres Pooling)
- Copiază din Supabase → Settings → Database → Connection string → `Prisma`/`Pooling` string.
- Setează în `.env.local` `DATABASE_URL` cu portul de pooling și parametri:
  - `postgresql://postgres:<parola>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`
- Alternativ (dacă dashboardul tău arată host `db.<ref>.supabase.co`):
  - `postgresql://postgres:<parola>@db.<ref>.supabase.co:6543/postgres?sslmode=require&pgbouncer=true&connection_limit=1`

## Pasul 3: Migrarea Prisma
- Pornește local, din folderul proiectului:
  - `bash -lc 'set -a; source .env.local; set +a; npx prisma migrate dev --name init'`
- Asta creează tabelele: `blog_posts`, `faqs`, `vehicles`, `about_pages`, `admin_password_resets`.
- Verifică: `bash -lc 'set -a; source .env.local; set +a; npx prisma migrate status'`.

## Pasul 4: Tabele Supabase pentru Admin (vizitatori/rezervări)
- Creează tabelele direct în Supabase (SQL editor):
### `live_visitors`
```sql
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
```
### `reservations`
```sql
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
- Aceste coloane acoperă atât schema „new” cât și fallback‑urile din cod.

## Pasul 5: Politici RLS (Siguranță și funcționalitate)
- Recomandat: folosește cheie de service pentru operații admin (mai sigur), altfel creează politici RLS.
### Opțiunea A (recomandată): Service Role pentru Admin
- Adaugă în `.env.local`:
  - `SUPABASE_SERVICE_ROLE_KEY=<service-role-key>` (din Supabase → API)
- Creează un client server‑side dedicat (fără expunere în browser) și folosește‑l în endpoint‑urile admin care fac `INSERT/UPDATE` (ex. rezervări). Vom implementa asta după confirmare.
### Opțiunea B (rapid, dar mai puțin sigur): Politici RLS permisive
- În SQL editor, setează politici minime pentru funcționare:
```sql
alter table live_visitors enable row level security;
create policy lv_read on live_visitors for select using (true);
create policy lv_write on live_visitors for insert with check (true);
create policy lv_update on live_visitors for update using (true) with check (true);

alter table reservations enable row level security;
create policy res_read on reservations for select using (true);
create policy res_update on reservations for update using (true) with check (true);
create policy res_insert on reservations for insert with check (true);
```
- După ce totul funcționează, putem restrânge politicile (de ex. doar server să poată scrie).

## Pasul 6: Verificări
- Admin → „Status Sistem” arată „Conectat” (Prisma), iar numerele de tabele apar.
- Tab „Vizitatori Live” nu mai raportează PGRST205 și listează vizitatori dacă există trafic.
- Tab „Rezervări” listează și permite update de status.

## Pasul 7: Probleme comune
- P1001: port DB blocat în rețea → folosește `6543` pooling, verifică firewall/VPN.
- RLS: fără politici sau fără service key, `UPDATE/INSERT` vor eșua → aplică Pasul 5A sau 5B.
- Secrete: nu expune `SUPABASE_SERVICE_ROLE_KEY` în client; rămâne doar în server.

## Următorii pași (cu acordul tău)
1) Setez `SUPABASE_SERVICE_ROLE_KEY` și adaug un client server pentru admin.
2) Creez politicile RLS minime (dacă preferi fără service key).
3) Rulez migrarea Prisma și verific în Admin „Status Sistem”.
4) Creez tabelele `live_visitors` și `reservations` în Supabase și testez tab‑urile Admin.

Confirmă opțiunea preferată pentru RLS (A: service role recomandat, B: politici permisive) și pornesc execuția.