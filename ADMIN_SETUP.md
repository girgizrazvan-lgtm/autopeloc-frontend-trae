# Admin Panel Setup

## Setup Baza de Date

1. **Migrare Prisma Schema:**
```bash
npx prisma migrate dev --name add_cms_models
```

2. **Generare Prisma Client:**
```bash
npx prisma generate
```

## Acces Admin

1. **Login:**
   - URL: `/admin/login`
   - Email: `razvan@autopeloc.ro`
   - Parolă: `Razvan4242`

2. **Panou Admin:**
   - URL: `/admin`
   - Funcționalități:
     - Blog Posts (CRUD)
     - FAQ (CRUD)
     - Mașini (CRUD)
     - Despre Noi (CRUD)

## API Routes

### Blog Posts
- `GET /api/admin/blog` - Lista blog posts
- `POST /api/admin/blog` - Creează blog post
- `PUT /api/admin/blog` - Actualizează blog post
- `DELETE /api/admin/blog?id=<id>` - Șterge blog post

### FAQ
- `GET /api/admin/faqs` - Lista FAQs
- `POST /api/admin/faqs` - Creează FAQ
- `PUT /api/admin/faqs` - Actualizează FAQ
- `DELETE /api/admin/faqs?id=<id>` - Șterge FAQ

### Vehicles
- `GET /api/admin/vehicles` - Lista mașini
- `POST /api/admin/vehicles` - Creează mașină
- `PUT /api/admin/vehicles` - Actualizează mașină
- `DELETE /api/admin/vehicles?id=<id>` - Șterge mașină

### About
- `GET /api/admin/about` - Lista secțiuni
- `POST /api/admin/about` - Creează secțiune
- `PUT /api/admin/about` - Actualizează secțiune
- `DELETE /api/admin/about?id=<id>` - Șterge secțiune

## SEO Improvements Implementate

1. **Article Schema** - Adăugat în `components/blog-layout.tsx`
2. **FAQPage Schema** - Adăugat în `components/faq-section.tsx`
3. **BreadcrumbList Schema** - Adăugat în `components/breadcrumbs.tsx` și `components/blog-layout.tsx`
4. **Meta Descriptions** - Deja optimizate în majoritatea paginilor

## Notițe

- Toate API routes-urile admin necesită autentificare (cookie `admin_session`)
- FAQ-urile sunt încărcate dinamic din baza de date, cu fallback la FAQ-urile hardcodate
- Blog posts vor fi migrate gradual de la pagini statice la conținut dinamic
- Mașinile pot fi gestionate complet din admin panel

