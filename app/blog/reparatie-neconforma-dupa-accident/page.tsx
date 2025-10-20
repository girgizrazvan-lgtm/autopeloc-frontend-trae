import { BlogLayout } from "@/components/blog-layout"

export const metadata = {
  title: "Ce se întâmplă dacă reparația mașinii după accident nu este conformă? | autopeloc.ro",
  description:
    "Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă. Află cum identifici problemele, ce pași să urmezi și cum să îți protejezi drepturile în 2025.",
  keywords:
    "reparație neconformă, defecte după reparație, drepturi păgubit, service auto, ANPC, garanție reparații, reclamație service",
  openGraph: {
    title: "Ce se întâmplă dacă reparația mașinii după accident nu este conformă?",
    description:
      "Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă. Află cum identifici problemele și ce pași să urmezi.",
    type: "article",
    url: "https://autopeloc.ro/blog/reparatie-neconforma-dupa-accident",
    publishedTime: "2025-09-24T10:00:00+03:00",
    authors: ["autopeloc.ro"],
    section: "Drepturi Consumator",
  },
  alternates: {
    canonical: "https://autopeloc.ro/blog/reparatie-neconforma-dupa-accident",
  },
}

export default function BlogPost() {
  return (
    <BlogLayout
      title="Ce se întâmplă dacă reparația mașinii după accident nu este conformă?"
      description="După un accident în care nu ești vinovat, așteptarea este ca mașina reparată să fie în perfectă stare, la parametri normali și fără costuri suplimentare. Totuși, situația ideală nu se întâmplă mereu: există cazuri când reparația efectuată în service nu este conformă."
      date="24 septembrie 2025"
      readTime="6 min"
      category="Drepturi Consumator"
      url="/blog/reparatie-neconforma-dupa-accident"
      relatedArticles={[
        {
          title: "Practici neetice în reparațiile auto pe RCA",
          url: "/blog/practici-neetice-reparatii-rca-2025",
          description: "Descoperă practicile neetice și cum să te protejezi ca păgubit.",
        },
        {
          title: "Flux complet al reparațiilor și mașinii la schimb",
          url: "/blog/flux-reparatii-service-masina-schimb-2025",
          description: "Ghid pas cu pas pentru procesul de reparații după accident.",
        },
      ]}
    >
      <h2>Cum identifici o reparație neconformă?</h2>
      <p>O reparație neconformă poate fi sesizată prin:</p>
      <ul>
        <li>Persistența sau reapariția defectului după predarea mașinii</li>
        <li>Probleme noi apărute după reparație, cum ar fi zgomote, vibrații sau disfuncționalități electrice</li>
        <li>Discrepanțe între devizul inițial și lucrările efectuate</li>
        <li>Aspecte vizuale neglijate sau de calitate slabă, ca vopsirea sau alinierea pieselor</li>
      </ul>

      <h2>Ce drepturi ai ca păgubit?</h2>
      <p>
        Conform legislației actuale, ai dreptul să soliciți repararea gratuită a neconformităților detectate după
        predare, fără a suporta costuri suplimentare. Dacă service-ul refuză să remedieze problema, ai opțiunea să ceri
        restituirea sumelor plătite pentru lucrările necorespunzătoare sau defectuoase.
      </p>
      <p>
        De asemenea, este posibil să depui plângeri la autoritățile competente, cum ar fi Autoritatea Națională pentru
        Protecția Consumatorului (ANPC), sau să apelezi la servicii juridice specializate pentru a-ți apăra drepturile.
      </p>

      <h2>Pași pentru soluționarea unei reparații neconforme</h2>
      <ol>
        <li>
          Informează imediat service-ul despre problema constatată și solicită remedierea gratuită în termenul legal de
          15 zile calendaristice
        </li>
        <li>Păstrează toate documentele: facturi, devize, constatări de la service și orice comunicare cu atelierul</li>
        <li>
          Dacă service-ul nu răspunde sau refuză să remedieze defectele, depune o reclamație oficială la ANPC, anexând
          toate documentele relevante
        </li>
        <li>
          În cazuri grave, consultă un avocat specializat în dreptul consumatorului pentru demararea unor acțiuni legale
        </li>
      </ol>

      <h2>Riscuri și recomandări</h2>
      <p>
        Neglijarea problemelor apărute după o reparație neconformă poate duce la deteriorarea suplimentară a mașinii și
        costuri crescute ulterior. Este esențial să monitorizezi cu atenție starea mașinii după predare și să acționezi
        prompt în cazul unor deficiențe.
      </p>
      <p>
        Alege service-uri autorizate și cu recenzii bune, care oferă transparență în procesul de reparație și garanție
        pentru lucrările efectuate. Păstrează relația cu asigurătorul și informează-l despre orice dificultăți în
        procesul de reparație.
      </p>
    </BlogLayout>
  )
}
