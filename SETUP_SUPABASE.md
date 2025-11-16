# Ghid Pas cu Pas - Configurare Supabase pentru Migrații Prisma

## Pasul 1: Accesează Supabase Dashboard
1. Deschide browser-ul și accesează: **https://supabase.com/dashboard**
2. Loghează-te cu contul tău Supabase
3. Selectează proiectul tău (ar trebui să vezi un proiect cu referința `ndweaccopjozbbyrsi`)

## Pasul 2: Găsește Connection String-ul
1. În meniul din stânga, apasă pe **"Settings"** (iconița cu rotița/șurub)
2. Apasă pe **"Database"** din submeniu
3. Scroll în jos până găsești secțiunea **"Connection string"**
4. Vei vedea mai multe tab-uri: "URI", "Connection pooling", "JDBC", etc.
5. **IMPORTANT**: Apasă pe tab-ul **"Connection pooling"** (NU pe "URI")
6. Vei vedea un string care arată cam așa:
   ```
   postgresql://postgres.ndweaccopjozbbyrsi:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
7. **Copiază întreg string-ul** (cu Ctrl+C sau Cmd+C pe Mac)

## Pasul 3: Dacă nu vezi parola în string
- Dacă în string vezi `[YOUR-PASSWORD]`, înseamnă că trebuie să-ți setezi parola
- Click pe butonul "Reset Database Password" din aceeași pagină
- Supabase va genera o parolă nouă - **COPIAZĂ-O IMEDIAT** (nu o vei mai putea vedea)
- Înlocuiește `[YOUR-PASSWORD]` în string cu parola reală copiată

## Pasul 4: Adaugă în .env.local
După ce ai connection string-ul complet:
1. Spune-mi string-ul complet și îl voi adăuga eu automat
2. SAU adaugă manual în fișierul `.env.local` (din folderul proiectului) o linie nouă:
   ```
   DATABASE_URL="postgresql://postgres.ndweaccopjozbbyrsi:[PAROLA]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
   (Înlocuiește [PAROLA] cu parola reală din Supabase)

## Pașii următori (după ce ai adăugat DATABASE_URL)
După ce am adăugat DATABASE_URL, voi rula automat:
- `npx prisma migrate dev` - pentru a crea tabelele în baza de date
- `npx prisma generate` - pentru a genera client-ul Prisma

## Ajutor rapid
Dacă ai întrebări sau probleme:
- Asigură-te că folosești tab-ul **"Connection pooling"** (NU "URI")
- Portul trebuie să fie **6543** (NU 5432)
- String-ul trebuie să conțină `?pgbouncer=true` la final
- Parola nu trebuie să conțină caractere speciale care ar putea cauza probleme (dacă da, înlocuiește-le cu % encodare)

