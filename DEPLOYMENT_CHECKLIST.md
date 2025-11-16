# Checklist pentru Deployment Live

## ✅ Ce este deja configurat:

1. **Tabelele Supabase** - Create prin SQL direct
   - `blog_posts` - pentru articole
   - `faqs` - pentru întrebări frecvente
   - `vehicles` - pentru vehicule
   - `about_pages` - pentru pagina Despre Noi

2. **Admin Panel** - Funcțional
   - Login: `razvan@autopeloc.ro` / `Razvan4242`
   - CRUD pentru toate secțiunile
   - Upload imagini
   - Drag & drop pentru reordonare

3. **Integrare cu paginile publice**
   - Articole noi apar automat în `/blog`
   - FAQ-uri apar pe toate paginile
   - Vehicule noi apar în `/flota-noastra`

---

## 🔧 Ce trebuie configurat pentru Production:

### 1. Variabile de Mediu (Environment Variables)

În platforma de deployment (Vercel/Netlify/etc.), adaugă următoarele variabile:

#### Supabase (OBLIGATORIU):
```
NEXT_PUBLIC_SUPABASE_URL=https://ndweaccucopjozbbyrsi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kd2VhY2N1Y29wam96YmJ5cnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODY3OTksImV4cCI6MjA3NTg2Mjc5OX0.aWK6dgy5wxwDv1eAyUao2sSX-6y4cAPtOI-aTCL0sBA
```

#### Database (OBLIGATORIU pentru Admin Panel):
```
DATABASE_URL=postgresql://postgres:Am91vmD2F8fqWY6g@db.ndweaccucopjozbbyrsi.supabase.co:5432/postgres?sslmode=require
```
**NOTĂ**: Înlocuiește cu connection string-ul corect când îl obții din Supabase Dashboard.

#### Email (OBLIGATORIU pentru rezervări):
```
RESEND_API_KEY=re_c8KUDsgR_CGMRSJbK3WbCaawJ4WMAJ7Dt
RESEND_FROM_EMAIL=cereri@yourdomain.ro
INTERNAL_NOTIFICATION_EMAIL=contact@yourdomain.ro
```
**IMPORTANT**: Actualizează email-urile cu domeniul tău real!

#### Site URL (OBLIGATORIU):
```
NEXT_PUBLIC_SITE_URL=https://autopeloc.ro
```
**IMPORTANT**: Schimbă cu URL-ul real al site-ului tău!

#### Vercel Blob (OBLIGATORIU pentru upload imagini):
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_LoIl5FsiD5hrn0pc_A0zVbNwvsZOVcbQwzuSufj4g5dKXvs
```

#### Admin Platform (OPȚIONAL):
```
NEXT_PUBLIC_ADMIN_URL=https://admin.autopeloc.ro
ADMIN_API_KEY=YOUR_ADMIN_API_KEY
```

---

### 2. Verificări Pre-Deployment

#### ✅ Baza de Date:
- [ ] Tabelele sunt create în Supabase (rulează `scripts/create-cms-tables.sql` dacă nu)
- [ ] Connection string-ul funcționează (testează cu Prisma Studio: `npx prisma studio`)

#### ✅ Variabile de Mediu:
- [ ] Toate variabilele sunt setate în platforma de deployment
- [ ] Email-urile sunt actualizate cu domeniul real
- [ ] `NEXT_PUBLIC_SITE_URL` este setat corect

#### ✅ Securitate:
- [ ] `ADMIN_EMAIL` este setat în environment variables
- [ ] `ADMIN_PASSWORD` este setat în environment variables (NU hardcodat în cod)
- [ ] Cookie-urile sunt setate cu `secure: true` în production
- [ ] `DATABASE_URL` nu este expus public (nu e în `NEXT_PUBLIC_*`)
- [ ] Upload API este protejat cu autentificare admin
- [ ] Toate input-urile sunt validate cu Zod
- [ ] HTML content este sanitizat pentru a preveni XSS

#### ✅ Funcționalități:
- [ ] Upload imagini funcționează (Vercel Blob configurat, protejat cu admin auth)
- [ ] Validare fișiere (dimensiune max 5MB, doar imagini)
- [ ] Email-urile funcționează (Resend configurat)
- [ ] Password reset funcționează
- [ ] Admin panel funcționează (testează login/logout)
- [ ] Slug uniqueness funcționează pentru blog posts
- [ ] Validare input-uri funcționează pentru toate form-urile

---

### 3. Pași pentru Deployment pe Vercel

1. **Push codul pe GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push
   ```

2. **Importă proiectul în Vercel**
   - Mergi la https://vercel.com
   - Click "New Project"
   - Importă repository-ul

3. **Configurează Environment Variables**
   - În Vercel Dashboard → Settings → Environment Variables
   - Adaugă toate variabilele din secțiunea 1

4. **Deploy**
   - Vercel va detecta automat Next.js
   - Click "Deploy"
   - Așteaptă build-ul să se finalizeze

5. **Verifică după deployment**
   - Testează: `https://yourdomain.com/admin`
   - Loghează-te și verifică funcționalitățile
   - Testează upload imagini
   - Testează adăugarea articolelor/FAQ-uri

---

### 4. Post-Deployment

#### Verificări:
- [ ] Site-ul se încarcă corect
- [ ] Admin panel funcționează
- [ ] Upload imagini funcționează
- [ ] Email-urile se trimit (testează rezervare)
- [ ] Articolele noi apar pe `/blog`
- [ ] Vehiculele noi apar pe `/flota-noastra`
- [ ] FAQ-urile apar pe pagini

#### Optimizări:
- [ ] Activează CDN pentru imagini (Vercel Blob)
- [ ] Configurează caching headers
- [ ] Activează analytics (Google Analytics deja integrat)
- [ ] Configurează monitoring (Sentry deja integrat)

---

### 5. Backup și Securitate

#### Backup:
- [ ] Exportă datele din Supabase periodic
- [ ] Backup pentru imagini (Vercel Blob are backup automat)

#### Securitate:
- [ ] Schimbă parola admin după primul login
- [ ] Configurează rate limiting pentru API-uri
- [ ] Activează 2FA pentru contul Supabase
- [ ] Review accesurile la Vercel Blob

---

### 6. Probleme Comune și Soluții

#### Admin panel nu funcționează:
- Verifică că `DATABASE_URL` este setat corect
- Verifică că tabelele există în Supabase
- Verifică log-urile Vercel pentru erori

#### Upload imagini nu funcționează:
- Verifică că `BLOB_READ_WRITE_TOKEN` este setat
- Verifică permisiunile în Vercel Blob dashboard

#### Email-uri nu se trimit:
- Verifică că `RESEND_API_KEY` este valid
- Verifică că domeniul este verificat în Resend
- Verifică spam folder-ul

---

## 📝 Notițe Importante:

1. **Credențiale Admin**: **CRITIC** - Setează `ADMIN_EMAIL` și `ADMIN_PASSWORD` în environment variables! Nu sunt hardcodate în cod pentru securitate.

2. **Connection String**: Când obții connection string-ul corect de la Supabase, actualizează `DATABASE_URL` în environment variables.

3. **Email-uri**: Actualizează toate email-urile cu domeniul real înainte de deployment.

4. **Domain**: Actualizează `NEXT_PUBLIC_SITE_URL` cu URL-ul real al site-ului.

5. **Securitate Production**: 
   - Toate input-urile sunt validate cu Zod
   - HTML content este sanitizat pentru a preveni XSS
   - Upload API este protejat cu admin authentication
   - Slug-urile sunt unice automat (cu sufix numeric dacă e necesar)

6. **Environment Variables**: Vezi `.env.example` pentru lista completă de variabile necesare.

---

## ✅ Gata pentru Deployment!

După ce ai completat toate checklist-urile, site-ul este gata pentru production! 🚀

