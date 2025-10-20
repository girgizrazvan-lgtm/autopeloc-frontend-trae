"use client"

import { ArrowLeft, Calendar, Clock, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"

export default function ReparatieNeconformaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ce se întâmplă dacă reparația mașinii după accident nu este conformă?",
    description: "Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă în 2025",
    author: {
      "@type": "Organization",
      name: "autopeloc.ro",
    },
    publisher: {
      "@type": "Organization",
      name: "autopeloc.ro",
      logo: {
        "@type": "ImageObject",
        url: "https://autopeloc.ro/logo.png",
      },
    },
    datePublished: "2025-09-24T10:00:00+03:00",
    dateModified: "2025-09-24T10:00:00+03:00",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://autopeloc.ro/blog/reparatie-neconforma-dupa-accident",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Înapoi la Blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">Drepturi Consumator</Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
            Ce se întâmplă dacă reparația mașinii după accident nu este conformă?
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime="2025-09-24">24 septembrie 2025</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>6 min citire</span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            După un accident în care nu ești vinovat, așteptarea este ca mașina reparată să fie în perfectă stare, la
            parametri normali și fără costuri suplimentare. Totuși, situația ideală nu se întâmplă mereu: există cazuri
            când reparația efectuată în service nu este conformă, iar mașina prezintă defecte, trebuie reparată din nou,
            sau chiar apar probleme noi.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Cum identifici o reparație neconformă?</h2>
          <p className="leading-relaxed">O reparație neconformă poate fi sesizată prin:</p>
          <ul className="space-y-3 list-disc pl-6">
            <li>
              <strong>Persistența sau reapariția defectului</strong> după predarea mașinii
            </li>
            <li>
              <strong>Probleme noi apărute după reparație</strong>, cum ar fi zgomote, vibrații sau disfuncționalități
              electrice
            </li>
            <li>
              <strong>Discrepanțe între devizul inițial și lucrările efectuate</strong>
            </li>
            <li>
              <strong>Aspecte vizuale neglijate</strong> sau de calitate slabă, ca vopsirea sau alinierea pieselor
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Ce drepturi ai ca păgubit?</h2>
          <p className="leading-relaxed">
            Conform legislației actuale, ai dreptul să soliciți <strong>repararea gratuită a neconformităților</strong>{" "}
            detectate după predare, fără a suporta costuri suplimentare. Dacă service-ul refuză să remedieze problema,
            ai opțiunea să ceri restituirea sumelor plătite pentru lucrările necorespunzătoare sau defectuoase.
          </p>
          <p className="leading-relaxed">
            De asemenea, este posibil să depui plângeri la autoritățile competente, cum ar fi{" "}
            <strong>Autoritatea Națională pentru Protecția Consumatorului (ANPC)</strong>, sau să apelezi la servicii
            juridice specializate pentru a-ți apăra drepturile.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Pași pentru soluționarea unei reparații neconforme</h2>
          <ol className="space-y-4 list-decimal pl-6">
            <li>
              <strong>Informează imediat service-ul</strong> despre problema constatată și solicită remedierea gratuită
              în termenul legal de 15 zile calendaristice
            </li>
            <li>
              <strong>Păstrează toate documentele</strong>: facturi, devize, constatări de la service și orice
              comunicare cu atelierul
            </li>
            <li>
              <strong>Dacă service-ul nu răspunde</strong> sau refuză să remedieze defectele, depune o reclamație
              oficială la ANPC, anexând toate documentele relevante
            </li>
            <li>
              <strong>În cazuri grave</strong>, consultă un avocat specializat în dreptul consumatorului pentru
              demararea unor acțiuni legale
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4">Riscuri și recomandări</h2>
          <p className="leading-relaxed">
            Neglijarea problemelor apărute după o reparație neconformă poate duce la{" "}
            <strong>deteriorarea suplimentară a mașinii</strong> și costuri crescute ulterior. Este esențial să
            monitorizezi cu atenție starea mașinii după predare și să acționezi prompt în cazul unor deficiențe.
          </p>
          <p className="leading-relaxed">
            Alege <strong>service-uri autorizate și cu recenzii bune</strong>, care oferă transparență în procesul de
            reparație și garanție pentru lucrările efectuate. Păstrează relația cu asigurătorul și informează-l despre
            orice dificultăți în procesul de reparație.
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-12" />

        <div className="mb-8">
          <ShareButtons
            url="/blog/reparatie-neconforma-dupa-accident"
            title="Ce se întâmplă dacă reparația mașinii după accident nu este conformă?"
            description="Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă."
          />
        </div>

        <div className="mt-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Ai nevoie de o mașină la schimb corectă?</h3>
          <p className="text-lg mb-6 text-white/90">
            Beneficiază de servicii transparente și conforme cu noile reglementări. Contactează-ne pentru o ofertă
            personalizată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:0790743974">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Phone className="mr-2 h-5 w-5" />
                Sună acum: 0790 743 974
              </Button>
            </a>
            <Link href="/flota">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-teal-600 hover:bg-gray-100">
                Vezi flota noastră
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center pt-12 border-t mt-12">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Toate articolele
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Înapoi acasă</Button>
          </Link>
        </div>
      </article>
    </div>
  )
}
