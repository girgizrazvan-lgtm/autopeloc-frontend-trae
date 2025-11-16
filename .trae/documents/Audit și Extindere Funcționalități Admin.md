## Obiectiv
- Audit complet al zonei `admin` și acoperirea tuturor feature‑elor menționate
- Identificarea golurilor funcționale și a riscurilor de securitate
- Plan de implementare etapizat pentru UI/Admin + API hardening

## Rezumat Constatări
- Tab‑uri prezente în `Admin`: `Articole`, `Întrebări Frecvente`, `Vehicule`, `Despre Noi`, `Status Sistem`, `Vizitatori Live` (`app/admin/page.tsx:529`).
- API‑uri Admin existente fără UI dedicat:
  - Rezervări: `app/api/admin/reservations/route.ts:7`
  - Cereri Website: `app/api/admin/website-requests/route.ts:5`
  - Media (listare/ștergere blob): `app/api/admin/blob-list/route.ts:4`, `app/api/admin/blob-delete/route.ts:4`
  - Trimitere email: `app/api/admin/send-email/route.ts:4`
  - Resetare parolă: endpoint OK (`app/api/admin/reset-password/route.ts`), lipsă tab dedicat
- Securitate: mai multe endpoint‑uri admin nu verifică sesiunea (`requireAdmin`): `send-email`, `blob-list`, `blob-delete`, `website-requests`, `reservations`.
- Config mediu: `INTERNAL_NOTIFICATION_EMAIL` este placeholder (`.env.local:8`) și se folosește în notificări (`app/api/booking/create-reservation/route.tsx:197`, `app/api/reservations/route.tsx:327`).
- Autentificare: fallback parolă dev `admin123` (`app/api/admin/login/route.ts:46`); `ADMIN_EMAIL` are default hard‑codificat (`app/api/admin/login/route.ts:5`).

## Impact și Riscuri
- Endpoints publice pot fi abuzate: listare/ștergere fișiere, trimitere email, acces rezervări și cereri.
- Lipsa UI pentru `Rezervări`, `Cereri Website` și `Media` blochează operarea.
- Config implicită poate direcționa notificări interne la adrese greșite.

## Plan de Remediere (Etape)
1) Hardening API (prioritar securitate)
- Adaugă `requireAdmin()` la: `send-email`, `blob-list`, `blob-delete`, `website-requests`, `admin/reservations`.
- Returnează `401` consistent la lipsă sesiune (model ca în `app/api/upload/route.ts:12` și `lib/admin-auth.ts:17`).
- Adaugă rate limiting basic pe rutele sensibile (email, blob delete).

2) Extindere UI Admin (feature parity)
- Tab „Rezervări”: listare, filtru `status`, vizualizare detalii, `PATCH` status (`app/api/admin/reservations/route.ts:76`).
- Tab „Cereri Website”: listare, `DELETE`, `PATCH status`, vizualizare payload (`app/api/admin/website-requests/route.ts:5,35,61,86`).
- Tab „Media”: listare `blob-list`, ștergere `blob-delete`, preview; menține upload în formularele existente.
- Tab „Utilitare Email” (opțional): formular `to/subject/body` către `/api/admin/send-email` pentru uz intern.
- Tab „Securitate” (opțional): expune flux `reset-password`, afișează starea sesiunii, loguri minime.

3) Config și Operare
- Setează corect: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `INTERNAL_NOTIFICATION_EMAIL` (`.env.local:8`).
- Setează `ADMIN_EMAIL` și `ADMIN_PASSWORD` în mediu (evită defaulturi).
- Verifică prisma/supabase: migrarea tabelelor (Blog/FAQ/Vehicles/About/Reset) și existența `live_visitors`, `reservations`, `booking_funnel_steps`.

4) UX și Calitate
- Validări cu `zod` pentru formuri noi + erori consistente.
- Mesaje/loaderi, paginare/limit pentru liste mari.
- Logare minimă în server (fără date sensibile) și cod de eroare clar.

## Livrabile
- Endpoint‑uri admin securizate
- 3–4 tab‑uri noi în `Admin` cu CRUD/operare completă
- Checklist env actualizat și testat (emailuri, notificări interne)
- Teste rapide de integrare pentru rutele noi

## Confirmare
- Dacă ești de acord cu planul, confirmă și încep implementarea etapelor 1–2, urmate de 3–4, cu validare la fiecare pas.