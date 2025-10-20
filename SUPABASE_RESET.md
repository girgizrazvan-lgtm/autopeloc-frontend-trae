# Reset și integrare Supabase (nou proiect)

Acest ghid te conduce prin resetarea schemei DB pentru noul proiect Supabase și configurarea variabilelor de mediu, astfel încât acest frontend să poată înregistra cereri (rezervări) și să se sincronizeze opțional cu panoul de admin.

## 1) Creează proiectul Supabase și ia cheile
- Creează un proiect nou în Supabase.
- Găsește `NEXT_PUBLIC_SUPABASE_URL` și `NEXT_PUBLIC_SUPABASE_ANON_KEY` în Settings → API.

## 2) Rulează scriptul de reset al schemei
- Deschide Supabase → SQL Editor.
- Rulează scriptul: `/reset-scriptssupabase-schema.sql` din repo.
- Scriptul face:
  - Drop (dacă există) și recreatează tabelele: `users`, `sessions`, `booking_sessions`, `booking_funnel_steps`, `reservations`.
  - Creează indecși și trigger pentru `updated_at`.
  - Conține (comentat) pașii pentru activarea RLS și politici permisive.

### Despre RLS
- Dacă vrei ca scrierile din site (anon key) să fie permise, activează RLS și adaugă politicile din script (secțiunea „Optional: Row Level Security”).
- Alternative: păstrezi RLS dezactivat pe aceste tabele (rapid pentru MVP), dar recomandat să revii cu politici mai stricte ulterior.

## 3) Configurează variabilele de mediu
- Copiază `.env.local.example` în `.env.local` și completează valorile:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INTERNAL_NOTIFICATION_EMAIL`
  - `NEXT_PUBLIC_SITE_URL` (pentru linkurile de download în emailuri)
  - `NEXT_PUBLIC_ADMIN_URL`, `ADMIN_API_KEY` (pentru sincronizarea opțională cu panoul de admin)
  - (opțional) `BLOB_READ_WRITE_TOKEN` pentru upload local la Vercel Blob

## 4) Testează fluxul de rezervare
1. Accesează pagina `Disponibilitate` → alege un vehicul → apasă `Rezervă acum`.
2. Completează formularul (nume, email, telefon) și atașează fișier (max 10MB).
3. La Submit:
   - Fișierul se urcă în Vercel Blob (`/api/upload`).
   - Rezervarea se scrie în `public.reservations` (Supabase) din ruta server `/api/booking/create-reservation`.
   - Se marchează pasul 3 în `public.booking_funnel_steps`.
   - Se trimit emailuri către client și intern (Resend).
4. Verifică în Supabase: tabelele `reservations` și `booking_funnel_steps` au înregistrări.

## 5) Integrarea cu panoul de admin (opțional)
- Setează `NEXT_PUBLIC_ADMIN_URL` și `ADMIN_API_KEY`.
- Dacă sunt prezente, `/api/booking/create-reservation` va sincroniza rezervarea către platforma admin.

## 6) Observații și hardening
- `document_url` este salvat; `document_blob_id` este lăsat `NULL` (upload la Vercel Blob returnează numai URL). Dacă ai nevoie de ID, adaptează ruta `/api/upload` să salveze și ID-ul.
- În repo există două utilitare pentru clientul Supabase server-side (`lib/supabase/server.ts` și `lib/supabase-server.ts`), ambele folosesc aceleași variabile. Poți unifica ulterior.
- Pentru producție, recomand politici RLS mai stricte și rute server-side care folosesc service role, pentru operațiuni administrative.

## 7) Troubleshooting rapid
- „Invalid API key” → verifică `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Scrieri care eșuează → verifică dacă RLS e activat și dacă politicile din script sunt aplicate.
- Linkuri de download în email greșite → setează `NEXT_PUBLIC_SITE_URL` corect (ex: `https://autopeloc.ro`).
- Emailuri nu pleacă → verifică `RESEND_API_KEY` și domeniul validat în Resend.