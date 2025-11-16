## Obiectiv
- Afișare vizitatori activi în timp real cu geo (țară/regiune/oraș, coordonate) și hartă globală animată, plus listă detalii.

## Schimbări de Schemas (Supabase)
1) Alter `live_visitors` pentru geo și unicitate:
- Coloane: `country_code text`, `country text`, `region text`, `city text`, `latitude double precision`, `longitude double precision`, `is_bot boolean default false`, `session_start timestamptz default now()`
- Index unic: `create unique index if not exists live_visitors_session_id_idx on live_visitors(session_id)`

## Track Endpoint
- `POST /api/track-visitor` (actual): Upsert pe `session_id`, heartbeat la 15s
- Modificări:
1) IP lookup via `ipapi.co/json` (fără cheie) folosind IP din `x-forwarded-for`; fallback dacă indisponibil.
2) Scriere geo doar la prima apariție a sesiunii sau când lipsesc coordonatele (evităm request la fiecare heartbeat).
3) Heuristici `is_bot` din `user-agent` (Googlebot, Bingbot, curl, etc.) și excludere bot din Admin implicit.
4) Rate‑limit simplu: ignoră update dacă <5s de la ultimul (per `session_id`).

## Admin API
- `GET /api/admin/visitors`:
- Include câmpurile geo, exclude `is_bot=true` implicit; parametru `include_bots=true` pentru debugging.
- Păstrează logica „activ” dacă `last_activity < 30s`.

## Admin UI
- Listă: pagina curentă, status (activ/inactiv), țară/oraș, timp de la ultima activitate, UA scurt.
- Hartă globală (SVG equirectangular) cu puncte animate (puls) la coordonate; tooltips cu oraș/țară.
- Filtre: „Doar activi”, „Include bot”; buton Reîmprospătare (fallback).

## Realtime subscription
- În Admin client, adaugă subscription Supabase Realtime la `live_visitors` (`postgres_changes`) folosind `NEXT_PUBLIC_SUPABASE_URL` și `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Evenimente: `insert`/`update` → actualizează lista și harta instant; păstrează polling 5s ca fallback.

## Securitate & Performanță
- Nu logăm IP în DB; stocăm doar geo agregat.
- Respectăm rate‑limits ipapi; cache per `session_id`.
- Curățare vizitatori inactivi (>24h) prin query la fetch sau script periodic.

## Pași de implementare
1) Aplic SQL alter pentru `live_visitors` (coloane + index).
2) Actualizez `POST /api/track-visitor` pentru geo/bot/rate‑limit.
3) Extind `GET /api/admin/visitors` să includă geo și filtre.
4) Actualizez `app/admin/page.tsx` cu listă și hartă SVG animată.
5) Adaug Realtime subscription în Admin și păstrez polling ca fallback.
6) Test end‑to‑end: navigare site → vizibil pe hartă în Admin, status live.

## Livrabile
- Tabela `live_visitors` extinsă
- Tracking cu geo, bot filtering, rate‑limit
- Admin „Vizitatori Live” cu hartă globală animată și listă detalii
- Realtime updates

## Notă
- ipapi.co este public, fără cheie; dacă depășim rate‑limit, voi adăuga fallback și cache local per sesiune.

Confirma și încep execuția imediat.