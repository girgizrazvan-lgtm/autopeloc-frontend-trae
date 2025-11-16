# Cum să obții Connection String-ul de la Supabase

Dacă nu vezi connection string-ul în Settings → Database, iată alternativele:

## Metoda 1: Construiește manual connection string-ul

În Supabase Dashboard:

1. **Mergi la Settings → Database**
2. Găsește secțiunea **"Connection info"** sau **"Database settings"**
3. Vei vedea informații precum:
   - **Host**: (ex: `aws-0-eu-central-1.pooler.supabase.com`)
   - **Database name**: (de obicei `postgres`)
   - **Port**: (pentru pooling: `6543`, pentru direct: `5432`)
   - **User**: (de obicei `postgres.ndweaccopjozbbyrsi`)
   - **Password**: (trebuie să o setezi dacă nu o ai)

4. **Dacă nu vezi parola**:
   - Caută butonul **"Reset Database Password"** sau **"Change Database Password"**
   - Click pe el și Supabase va genera o parolă nouă
   - **COPIAZĂ PAROLA IMEDIAT** (nu o vei mai vedea)
   - Salvează-o într-un loc sigur

5. **Construiește connection string-ul**:
   ```
   postgresql://[USER]:[PASSWORD]@[HOST]:6543/[DATABASE]?pgbouncer=true
   ```
   
   Exemplu:
   ```
   postgresql://postgres.ndweaccopjozbbyrsi:[PAROLA_TA]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

## Metoda 2: Folosește Direct Connection (fără pooling)

Dacă nu găsești pooling connection string:

1. În **Settings → Database**, caută **"Connection parameters"** sau **"Direct connection"**
2. Folosește portul **5432** în loc de 6543
3. Connection string-ul va arăta așa:
   ```
   postgresql://postgres:[PAROLA]@db.ndweaccopjozbbyrsi.supabase.co:5432/postgres
   ```
   (Observă: `db.` în loc de `aws-0-eu-central-1.pooler.` și portul 5432)

## Metoda 3: Din Supabase Dashboard direct

1. În Supabase Dashboard, mergi la proiectul tău
2. În partea stângă, apasă pe **"SQL Editor"**
3. În header-ul paginii, ar trebui să vezi informații despre conexiune
4. SAU caută în **Settings → API** - acolo sunt de obicei toate informațiile de conexiune

## Ce îmi trebuie de la tine:

1. **HOST** (adresa serverului - ex: `aws-0-eu-central-1.pooler.supabase.com` sau `db.ndweaccopjozbbyrsi.supabase.co`)
2. **PORT** (6543 pentru pooling SAU 5432 pentru direct)
3. **DATABASE NAME** (de obicei `postgres`)
4. **USER** (de obicei `postgres.ndweaccopjozbbyrsi` sau doar `postgres`)
5. **PASSWORD** (parola bazei de date - trebuie setată dacă nu o ai)

**Dacă găsești aceste informații în Settings → Database, spune-mi-le și voi construi eu connection string-ul!**

## Alternative: Folosește Supabase CLI

Dacă ai Supabase CLI instalat:
```bash
supabase status
```
Va afișa toate informațiile de conexiune.

