# Plan de Îmbunătățire SEO - autopeloc.ro
**Document practic pentru implementare**

---

## 🚀 IMPLEMENTARE PRIORITATE ÎNALTĂ

### 1. Article Schema pentru Blog Posts

**Fișier:** `components/blog-layout.tsx`

**Adăugare:**
```typescript
// În BlogLayout component, adăugare script structured data
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: `https://autopeloc.ro${ogImage || '/images/dashboard.jpg'}`,
      datePublished: date,
      dateModified: dateModified || date,
      author: {
        "@type": "Organization",
        name: "autopeloc.ro",
        url: "https://autopeloc.ro"
      },
      publisher: {
        "@type": "Organization",
        name: "autopeloc.ro",
        logo: {
          "@type": "ImageObject",
          url: "https://autopeloc.ro/favicon.svg"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://autopeloc.ro${url}`
      },
      articleSection: category,
      keywords: keywords?.join(", ") || ""
    })
  }}
/>
```

**Impact:** Rich snippets în Google, mai multe click-uri  
**Timp:** 30 min

---

### 2. FAQPage Schema

**Fișier:** `components/faq-section.tsx`

**Extragere FAQ-uri:**
1. Identifică toate întrebările și răspunsurile din FAQ
2. Adaugă structured data

**Exemplu:**
```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Cât costă mașina la schimb?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Costul este 0 pentru păgubit, conform legislației..."
      }
    },
    // ... alte întrebări
  ]
}
```

**Impact:** FAQ rich snippets în Google  
**Timp:** 1-2 ore

---

### 3. BreadcrumbList Schema

**Fișier:** `components/breadcrumbs.tsx` (NOU)

**Creare componentă reutilizabilă:**
```typescript
interface Breadcrumb {
  name: string
  url: string
}

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://autopeloc.ro${item.url}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-2">
          {items.map((item, index) => (
            <li key={index}>
              {index < items.length - 1 ? (
                <>
                  <Link href={item.url}>{item.name}</Link>
                  <span> / </span>
                </>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
```

**Folosire:**
```typescript
// În pagini
<Breadcrumbs items={[
  { name: "Acasă", url: "/" },
  { name: "Servicii", url: "/servicii" },
  { name: "Mașină la schimb RCA", url: "/servicii/masina-schimb-rca" }
]} />
```

**Impact:** Breadcrumb rich snippets, navigare mai bună  
**Timp:** 2-3 ore

---

### 4. Optimizare Meta Descriptions

**Acțiuni:**
1. Verifică toate paginile
2. Optimizează la 150-160 caractere
3. Include keywords naturale
4. Include call-to-action

**Checklist:**
- [ ] Homepage (`app/page.tsx`) ✅ OK
- [ ] Blog listing (`app/blog/page.tsx`) ⚠️ Trebuie optimizat
- [ ] Blog posts - verificare fiecare
- [ ] Servicii - verificare fiecare pagină
- [ ] Despre noi (`app/despre-noi/page.tsx`)
- [ ] Contact (`app/contact/page.tsx`)
- [ ] Flota noastră (`app/flota-noastra/page.tsx`)
- [ ] Disponibilitate (`app/disponibilitate/page.tsx`)

**Exemplu optimizare:**
```typescript
// Înainte:
description: "Articole despre drepturile șoferilor și legislație RCA"

// După:
description: "Ghiduri complete despre drepturile șoferilor în accidente RCA, legislație actualizată 2025 și cum să obții mașină la schimb gratuită. Informații verificate de experți."
```

**Impact:** Mai multe click-uri din rezultatele căutării  
**Timp:** 1-2 ore

---

## 🔧 IMPLEMENTARE PRIORITATE MEDIE

### 5. Service Schema pentru Pagini Servicii

**Fișier:** `app/servicii/*/page.tsx`

**Exemplu pentru Mașină Schimb RCA:**
```typescript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Mașină la schimb RCA",
  provider: {
    "@type": "Organization",
    name: "autopeloc.ro",
    url: "https://autopeloc.ro"
  },
  areaServed: {
    "@type": "Country",
    name: "România"
  },
  description: "Servicii de mașină de înlocuire pentru păgubiți în accidente RCA",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "RON",
    description: "Gratuit pentru păgubit"
  }
}
```

**Impact:** Îmbunătățește înțelegerea serviciilor de către Google  
**Timp:** 2-3 ore (pentru toate paginile)

---

### 6. Optimizare Alt Texts

**Acțiuni:**
1. Recenzii toate imagini
2. Alt texts descriptive: "Model An - Categorie - Serviciu - Locație"

**Exemplu:**
```typescript
// Înainte:
alt={model.name}

// După:
alt={`${model.name} ${model.year} - ${model.category} disponibilă pentru închiriere RCA în România`}
```

**Fișiere de verificat:**
- `app/flota-noastra/_components/all-models.tsx`
- `app/disponibilitate/page.tsx`
- `components/hero-section.tsx`
- Alte componente cu imagini

**Impact:** Accesibilitate și SEO pentru imagini  
**Timp:** 2-3 ore

---

### 7. Îmbunătățire Internal Linking

**Acțiuni:**
1. Adăugare link-uri contextuale în conținutul blog posts
2. Creare "hub pages" pentru categorii
3. Link-uri între articole conexe (✅ există parțial)

**Exemplu în blog post:**
```typescript
// În loc de text simplu:
"Conform Normei ASF nr. 20/2017..."

// Adaugă link:
<Link href="/blog/masuri-asf-reducere-fraude-2025">
  Conform Normei ASF nr. 20/2017
</Link>
```

**Hub pages recomandate:**
- `/servicii` - hub pentru toate serviciile
- `/blog/categorie/legislatie` - hub pentru articole despre legislație
- `/blog/categorie/ghiduri` - hub pentru ghiduri practice

**Impact:** Distribuie PageRank, îmbunătățește navigarea  
**Timp:** 4-5 ore

---

### 8. Author Tags pentru Blog

**Fișier:** `components/blog-layout.tsx`

**Adăugare în metadata:**
```typescript
export const metadata: Metadata = {
  // ... existing
  authors: [
    { name: "autopeloc.ro", url: "https://autopeloc.ro" }
  ],
  // ... existing
}
```

**În Article Schema:**
```typescript
author: {
  "@type": "Organization",
  name: "autopeloc.ro",
  url: "https://autopeloc.ro",
  sameAs: [
    "https://www.facebook.com/autopeloc",
    "https://www.linkedin.com/company/autopeloc"
  ]
}
```

**Impact:** E-E-A-T signal pentru Google  
**Timp:** 30 min

---

## 🔍 VERIFICARE ȘI TESTARE

### Tools pentru validare:

1. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - Testează fiecare tip de structured data

2. **Schema.org Validator**
   - https://validator.schema.org/
   - Validare format JSON-LD

3. **Google Search Console**
   - Monitorizare erori structured data
   - Verificare indexing

4. **PageSpeed Insights**
   - Core Web Vitals
   - Performance metrics

### Checklist validare:

- [ ] Toate Article schemas validate
- [ ] FAQPage schema validată
- [ ] BreadcrumbList schema validată
- [ ] Service schemas validate
- [ ] Meta descriptions verificate (150-160 caractere)
- [ ] Alt texts verificate pe toate imaginile
- [ ] Internal links verificate
- [ ] Rich results apar în Google Search Console
- [ ] Core Web Vitals în "Good"

---

## 📅 TIMELINE RECOMANDAT

### Săptămâna 1 (Prioritate Înaltă)
- **Ziua 1-2:** Article Schema + FAQPage Schema
- **Ziua 3-4:** BreadcrumbList Schema
- **Ziua 5:** Optimizare Meta Descriptions

### Săptămâna 2 (Prioritate Medie)
- **Ziua 1-2:** Service Schema pentru servicii
- **Ziua 3:** Optimizare Alt Texts
- **Ziua 4-5:** Îmbunătățire Internal Linking

### Săptămâna 3 (Verificare și Optimizare)
- **Ziua 1-2:** Testare și validare
- **Ziua 3-4:** Corecții bazate pe rezultate
- **Ziua 5:** Monitorizare inițială

---

## 📊 METRICI DE URMĂRIRE

### Metrici principale:
1. **Organic Traffic** - Google Analytics
2. **Impressions** - Google Search Console
3. **Click-Through Rate (CTR)** - GSC
4. **Average Position** - GSC
5. **Core Web Vitals** - PageSpeed Insights
6. **Rich Results** - GSC

### Obiective (3 luni):
- +25-40% organic traffic
- +30-50% impressions
- +15-25% CTR
- +5-10 poziții average position
- Toate Core Web Vitals în "Good"

---

## 🎓 RESURSE

### Documentație:
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data)

### Tools:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Notă:** Implementarea trebuie făcută incremental, cu testare după fiecare schimbare majoră.

