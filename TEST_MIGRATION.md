# Testare Scripturi de Migrare

Acest document oferă instrucțiuni pentru testarea scripturilor de migrare create pentru CMS.

## Scripturi Disponibile

1. **seed-blog-posts.ts** - Migrează articole blog din paginile statice
2. **seed-vehicles.ts** - Migrează vehicule din fleet-data.ts
3. **seed-faqs.ts** - Migrează FAQs din componente
4. **seed-about-sections.ts** - Migrează secțiuni About

## Pași de Testare

### 1. Verificare Pregătire

```bash
# Verifică că ai conexiunea la baza de date configurată
echo $DATABASE_URL

# Verifică că Prisma Client este generat
npx prisma generate

# Verifică că tabelele există în baza de date
npx prisma db pull
```

### 2. Rulare Scripturi de Migrare

```bash
# Migrează blog posts
npx tsx scripts/seed-blog-posts.ts

# Migrează vehicule
npx tsx scripts/seed-vehicles.ts

# Migrează FAQs
npx tsx scripts/seed-faqs.ts

# Migrează secțiuni About
npx tsx scripts/seed-about-sections.ts
```

### 3. Verificare Rezultate

#### Verificare în Admin Panel
1. Accesează `/admin`
2. Verifică fiecare secțiune:
   - **Articole**: Ar trebui să vezi blog posts migrate
   - **Întrebări Frecvente**: Ar trebui să vezi FAQs migrate
   - **Vehicule**: Ar trebui să vezi vehicule migrate cu brand/model separat
   - **Despre Noi**: Ar trebui să vezi secțiuni About migrate
   - **Status Sistem**: Verifică statusul tabelelor și numărul de înregistrări

#### Verificare pe Site Public
1. **Blog**: `/blog` - Ar trebui să apară articolele din DB
2. **FAQ Section**: Ar trebui să apară FAQs din DB pe toate paginile
3. **Fleet**: `/flota-noastra` - Ar trebui să apară vehiculele din DB
4. **About**: `/despre-noi` - Ar trebui să apară conținutul din DB (dacă este implementat CMS)

### 4. Verificare Fallback

Pentru a testa funcționalitatea de fallback:

1. **Oprește temporar conexiunea la DB** (comentează `DATABASE_URL` în `.env.local`)
2. **Reîncarcă paginile** - Ar trebui să folosească date fallback
3. **Verifică console logs** - Ar trebui să vezi warning-uri despre fallback
4. **Restabilește conexiunea** la DB

### 5. Verificare Logging

Verifică console logs pentru mesaje de forma:
- `[Blog] Successfully loaded X blog posts from database`
- `[FAQ] Successfully loaded X FAQs from database`
- `[Fleet] Successfully loaded X vehicles from database`

Sau warning-uri de forma:
- `[Blog] No published posts found in database, using fallback data`
- `[FAQ] API returned 500, using fallback data`

### 6. Validare Date

#### Blog Posts
- ✅ Slug-uri sunt SEO-friendly
- ✅ Conținutul este complet
- ✅ Categoriile sunt corecte
- ✅ Read time este setat

#### FAQs
- ✅ Toate întrebările și răspunsurile sunt complete
- ✅ Order este setat corect
- ✅ isActive este true pentru FAQs active

#### Vehicule
- ✅ Brand și model sunt extrase separat
- ✅ Specs-urile sunt complete (engine, transmission, seats, fuel)
- ✅ Categoria este setată corect
- ✅ Imaginile sunt disponibile

#### About Sections
- ✅ Section names sunt unice (hero, journey, vision, etc.)
- ✅ Conținutul text este complet
- ✅ Order este setat corect

### 7. Testare Duplicate Prevention

Încearcă să rulezi scripturile din nou:

```bash
# Rulează din nou scripturile - ar trebui să skip duplicate
npx tsx scripts/seed-blog-posts.ts
npx tsx scripts/seed-vehicles.ts
npx tsx scripts/seed-faqs.ts
npx tsx scripts/seed-about-sections.ts
```

Verifică că vezi mesaje de forma:
- `⏭️  Skipping "..." (already exists)`
- `🔄 Updated: ...` (pentru about sections care se actualizează)

### 8. Verificare în Production

După deployment:

1. **Verifică API endpoints**:
   - `GET /api/blog` - Ar trebui să returneze blog posts
   - `GET /api/faqs` - Ar trebui să returneze FAQs active
   - `GET /api/vehicles` - Ar trebui să returneze vehicule active
   - `GET /api/about` - Ar trebui să returneze secțiuni About

2. **Verifică Sitemap**:
   - `/sitemap-blog.xml` - Ar trebui să conțină blog posts din DB

3. **Verifică Status Sistem**:
   - `/admin` → Status Sistem tab
   - Verifică că toate tabelele sunt "Conectat" și au înregistrări

## Probleme Posibile și Soluții

### Eroare: "Table does not exist"
**Soluție**: Rulează migrațiile Prisma sau creează tabelele manual folosind `scripts/create-cms-tables.sql`

### Eroare: "Can't reach database server"
**Soluție**: Verifică `DATABASE_URL` în `.env.local` și conexiunea la Supabase

### Datele nu apar pe site
**Soluție**: 
1. Verifică că `isPublished` / `isActive` este `true` pentru elementele pe care vrei să le vezi
2. Verifică console logs pentru erori
3. Verifică că API endpoints returnează date corecte

### Fallback nu funcționează
**Soluție**: Verifică că datele fallback sunt definite corect în componente și că error handling-ul este implementat

## Note

- Scripturile sunt **idempotente** - pot fi rulate de multiple ori fără să creeze duplicate
- Scripturile **skip** duplicate-urile automat bazându-se pe slug/name
- Pentru About sections, scripturile **actualizează** secțiunile existente în loc să le skip
- Toate scripturile au **logging detaliat** pentru debugging

