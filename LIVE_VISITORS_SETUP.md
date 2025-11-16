# Setup Tracking Vizitatori Live

Acest document descrie cum să configurezi funcționalitatea de tracking live pentru vizitatori în admin.

## Pași de Setup

### 1. Creează tabelul în Supabase

Rulează scriptul SQL în Supabase SQL Editor:

```bash
scripts/create-live-visitors-table.sql
```

Acest script va crea:
- Tabelul `live_visitors` pentru a stoca datele vizitatorilor
- Indexuri pentru performanță
- Trigger pentru `updated_at`
- Row Level Security policies

### 2. Verifică că totul funcționează

1. **Tracking automat**: Componenta `VisitorTracker` este deja adăugată în `app/layout.tsx` și va începe să urmărească automat toți vizitatorii.

2. **Admin Dashboard**: 
   - Accesează `/admin` și autentifică-te
   - Click pe tab-ul "Vizitatori Live"
   - Ar trebui să vezi vizitatorii activi în timp real

## Funcționalități

### Tracking Automat
- Fiecare vizitator primește un `session_id` unic stocat în `sessionStorage`
- Tracking-ul se actualizează automat:
  - La schimbarea paginii
  - La fiecare 15 secunde (heartbeat)
  - Când utilizatorul revine pe tab (visibility change)

### Admin Dashboard
- **Actualizare în timp real**: Datele se actualizează automat la fiecare 5 secunde
- **Status vizitatori**:
  - **Activ**: Ultima activitate < 30 secunde (punct verde animat)
  - **Inactiv**: Ultima activitate > 30 secunde (punct gri)
- **Informații afișate**:
  - Pagina curentă
  - Titlul paginii
  - Referrer (dacă există)
  - Browser/User Agent
  - Timpul ultimei activități
  - Ora primei vizite

### Date Trackate
- `session_id`: ID unic pentru fiecare sesiune
- `current_page`: URL-ul paginii curente
- `page_title`: Titlul paginii
- `referrer`: Pagina de unde a venit vizitatorul
- `user_agent`: Informații despre browser
- `last_activity`: Timestamp-ul ultimei activități
- `first_seen`: Timestamp-ul primei vizite

## Limitări și Considerații

1. **Privacy**: Tracking-ul nu colectează date personale (IP, email, etc.)
2. **Retenție**: Vizitatorii inactivi mai mult de 2 minute nu mai apar în listă
3. **Performanță**: Tabelul se curăță automat de vizitatori vechi (opțional, prin cron job)
4. **Admin Only**: Doar utilizatorii autentificați ca admin pot vedea datele

## Troubleshooting

### Nu apar vizitatori în admin
1. Verifică că tabelul `live_visitors` există în Supabase
2. Verifică că RLS policies sunt configurate corect
3. Verifică console-ul browser-ului pentru erori
4. Verifică că `VisitorTracker` este inclus în layout

### Tracking-ul nu funcționează
1. Verifică că endpoint-ul `/api/track-visitor` răspunde corect
2. Verifică că Supabase credentials sunt configurate corect
3. Verifică console-ul pentru erori de tracking

## Curățare Automată (Opțional)

Pentru a curăța automat vizitatorii vechi, poți configura un cron job în Supabase:

```sql
-- Activează extensia pg_cron (dacă nu este deja activată)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Programează curățarea la fiecare 5 minute
SELECT cron.schedule(
  'cleanup-visitors',
  '*/5 * * * *',
  'SELECT public.cleanup_inactive_visitors()'
);
```

