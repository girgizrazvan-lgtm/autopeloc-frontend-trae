# Setup Complet Supabase - De la Zero

## Pasul 1: Verifică Proiectul Supabase

1. **Deschide Supabase Dashboard:**
   - Mergi la: https://supabase.com/dashboard
   - Loghează-te cu contul tău

2. **Verifică dacă ai un proiect:**
   - Dacă vezi proiectul `ndweaccucopjozbbyrsi` → continuă la Pasul 2
   - Dacă NU ai proiect → trebuie să creezi unul nou (Pasul 1.1)

### Pasul 1.1: Creează Proiect Nou (dacă nu ai)
1. Click pe butonul **"New Project"** sau **"Create Project"**
2. Completează:
   - **Name**: autopeloc (sau orice nume vrei)
   - **Database Password**: Generează o parolă puternică (SAU setează una tu)
   - **Region**: Alege cea mai apropiată de tine (ex: Europe West)
   - **Pricing Plan**: Free (pentru început)
3. Click **"Create new project"**
4. Așteaptă 1-2 minute până se creează proiectul

---

## Pasul 2: Obține Informațiile de Conectare

După ce proiectul este gata:

1. **Mergi la Settings → Database**
   - În meniul din stânga, click pe **"Settings"** (iconița cu rotița)
   - Click pe **"Database"** din submeniu

2. **Găsește Connection String-ul:**
   - Scroll în jos până vezi secțiunea **"Connection string"**
   - Vei vedea mai multe tab-uri: **URI**, **Connection pooling**, **JDBC**, etc.
   - **IMPORTANT**: Click pe tab-ul **"Connection pooling"**
   - Vei vedea un string care arată cam așa:
     ```
     postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
     ```

3. **Dacă vezi [YOUR-PASSWORD] în string:**
   - Click pe butonul **"Reset Database Password"** (sau "Change Database Password")
   - Supabase va genera o parolă nouă
   - **COPIAZĂ PAROLA IMEDIAT** (nu o vei mai putea vedea!)
   - Înlocuiește `[YOUR-PASSWORD]` în string cu parola copiată

4. **Copiază întreg connection string-ul:**
   - Ar trebui să arate cam așa (cu parola reală):
     ```
     postgresql://postgres.ndweaccucopjozbbyrsi:Am91vmD2F8fqWY6g@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```

---

## Pasul 3: Adaugă Connection String-ul în Proiect

După ce ai connection string-ul complet:

1. **Spune-mi connection string-ul** și îl voi adăuga automat în `.env.local`
2. **SAU** adaugă manual în fișierul `.env.local` (din folderul proiectului):
   ```
   DATABASE_URL="postgresql://postgres.ndweaccucopjozbbyrsi:[PAROLA]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
   (Înlocuiește `[PAROLA]` cu parola reală)

---

## Pasul 4: Rulează Migrațiile (Voi face eu automat)

După ce am adăugat `DATABASE_URL`, voi rula automat:
- `npx prisma migrate dev` - pentru a crea tabelele în baza de date
- `npx prisma generate` - pentru a genera client-ul Prisma

---

## Troubleshooting

### Dacă nu vezi "Connection string" în Settings → Database:
1. Verifică că proiectul este complet creat (poate dura 1-2 minute)
2. Caută în Settings → Database → "Connection info" sau "Database settings"
3. Poate vezi doar câmpuri separate (Host, Port, User) - spune-mi ce vezi

### Dacă connection string-ul nu funcționează:
- Asigură-te că folosești tab-ul **"Connection pooling"** (NU "URI")
- Portul trebuie să fie **6543** (NU 5432)
- String-ul trebuie să conțină `?pgbouncer=true` la final

### Dacă ai erori de conexiune:
- Verifică că parola este corectă (fără spații la început/sfârșit)
- Verifică că host-ul este corect (poate varia în funcție de regiune)
- Încearcă să resetezi parola din nou

---

## Ce urmează după setup?

După ce migrațiile rulează cu succes:
1. ✅ Tabelele vor fi create în baza de date Supabase
2. ✅ Poți accesa panoul admin la `/admin`
3. ✅ Poți adăuga articole, FAQ-uri, vehicule din admin
4. ✅ Toate datele vor apărea automat pe site

