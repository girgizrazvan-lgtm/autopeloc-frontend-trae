import { BlogLayout } from "@/components/blog-layout"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Măsuri propuse de ASF pentru reducerea fraudelor în 2025 | autopeloc.ro",
  description:
    "Descoperă cele 12 măsuri concrete implementate de ASF, ANAF și ANPC în 2025 pentru combaterea fraudelor în sistemul RCA și reducerea prețurilor nejustificate.",
  keywords: [
    "măsuri ASF 2025",
    "reducere fraude RCA",
    "sistem bonus-malus",
    "digitalizare RCA",
    "controale ANAF",
    "transparență asigurări",
    "reforme RCA România",
  ],
  authors: [{ name: "autopeloc.ro" }],
  openGraph: {
    title: "Măsuri propuse de ASF pentru reducerea fraudelor în 2025",
    description: "Cele 12 măsuri concrete implementate pentru combaterea fraudelor în sistemul RCA.",
    type: "article",
    publishedTime: "2025-10-08T09:00:00Z",
    modifiedTime: "2025-10-08T09:00:00Z",
    authors: ["autopeloc.ro"],
    section: "Legislație",
    tags: ["măsuri ASF 2025", "reducere fraude RCA", "sistem bonus-malus", "digitalizare RCA"],
    images: [
      {
        url: "/images/dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Măsuri propuse de ASF pentru reducerea fraudelor în 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Măsuri propuse de ASF pentru reducerea fraudelor în 2025",
    description: "Cele 12 măsuri concrete implementate pentru combaterea fraudelor în sistemul RCA.",
    images: ["/images/dashboard.jpg"],
  },
  alternates: {
    canonical: "https://autopeloc.ro/blog/masuri-asf-reducere-fraude-2025",
  },
}

export default function BlogPost() {
  return (
    <BlogLayout
      title="Măsuri propuse de ASF pentru reducerea fraudelor în 2025"
      description="Descoperă cele 12 măsuri concrete implementate de Autoritatea de Supraveghere Financiară, ANAF și ANPC pentru combaterea fraudelor sistematice în sistemul RCA și reducerea prețurilor nejustificate."
      date="8 octombrie 2025"
      readTime="10 min"
      category="Legislație"
      url="/blog/masuri-asf-reducere-fraude-2025"
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
      <p className="text-lg text-muted-foreground">
        În 2025, autoritățile române au implementat un pachet comprehensiv de 12 măsuri concrete pentru combaterea
        fraudelor sistematice în sistemul RCA. Aceste reforme vizează digitalizarea, transparența și controlul în timp
        real al proceselor.
      </p>

      <h2>Reforme în sistemul de asigurări</h2>

      <h3>1. Revizuirea sistemului Bonus-Malus</h3>
      <p>
        Autoritatea de Supraveghere Financiară a propus o reformă completă a sistemului bonus-malus pentru o mai bună
        încadrare în clasele existente în funcție de tipul daunelor produse. Scopul este reflectarea reală a profilului
        și comportamentului asiguratului și responsabilizarea acestuia.
      </p>
      <p>
        Această măsură vine ca răspuns la situațiile în care șoferii cu istoric negativ reușeau să evite penalizările
        prin diverse metode, contribuind la creșterea generală a prețurilor RCA.
      </p>

      <h3>2. Digitalizarea completă a procesului</h3>
      <p>
        Din 2025, toate polițele RCA se emit exclusiv în sistem electronic, iar implementarea sistemului electronic va
        reduce semnificativ erorile de completare și va crește acuratețea bazei de date CEDAM.
      </p>
      <p>
        Digitalizarea elimină posibilitatea manipulării documentelor fizice și permite verificarea instantanee a
        istoricului vehiculelor și șoferilor.
      </p>

      <h2>Măsuri antifraudă concrete</h2>

      <h3>3. Declarația D397 pentru platformele de ride-sharing</h3>
      <p>
        ANAF a introdus în 2025 declarația informativă D397 pe care platformele precum Uber și Bolt o depun periodic.
        Aceasta permite un control activ și în timp real asupra activităților din transportul alternativ, combătând
        munca nedeclarată.
      </p>

      <h3>4. Controale ANAF și măsuri asigurătorii</h3>
      <p>
        Recent, ANAF a aplicat măsuri asigurătorii în valoare de 175 milioane lei pentru firme de ride-sharing care
        fraudau sistemul fiscal. Aceste măsuri includ sechestru pe conturi și active pentru recuperarea prejudiciilor.
      </p>

      <h2>Schimbări în metodologia de tarifare</h2>

      <h3>5. Trecerea la puterea motorului în loc de cilindree</h3>
      <p>
        Din 2025, tarifele RCA se calculează pe baza puterii motorului (kW) în loc de capacitatea cilindrică, iar țara
        este împărțită în doar două zone: București-Ilfov și restul județelor.
      </p>

      <h3>6. Plafonarea comisioanelor</h3>
      <p>
        Comisionul brokerilor de asigurări este limitat la maxim 8% din valoarea poliței RCA, iar pentru contractarea
        directă este plafonat la 15%.
      </p>

      <h2>Măsuri de control și transparență</h2>

      <h3>7. Controale ANPC intensificate</h3>
      <p>
        ANPC a efectuat controale la 386 service-uri auto, aplicând amenzi de 496.500 lei pentru practici ilegale față
        de consumatori și nereguli la comercializarea pieselor de schimb.
      </p>

      <h3>8. Folosirea platformelor specializate</h3>
      <p>
        Consiliul Concurenței propune folosirea platformelor specializate precum Audatex pentru calculul despăgubirilor,
        în loc să permită service-urilor să stabilească propriile prețuri.
      </p>

      <h2>Combaterea fraudelor în reparații</h2>

      <h3>9. Limitarea tarifelor umflate</h3>
      <p>
        Autoritățile lucrează la plafoane reale pentru costurile de reparații după ce s-au identificat cazuri cu devize
        de 7 ori mai mari decât valoarea mașinii.
      </p>

      <h3>10. Verificarea în timp real a kilometrajului</h3>
      <p>
        Se preconizează implementarea de baze de date interconectate pentru kilometraj, care să permită schimbul
        transfrontalier de informații despre istoricul vehiculului.
      </p>

      <h2>Măsuri UE pentru combaterea fraudelor auto</h2>

      <h3>11. Digitalizarea documentelor</h3>
      <p>
        Înmatriculările și inspecțiile tehnice vor avea formate digitale, simplificând birocrația și favorizând
        mobilitatea între statele membre UE.
      </p>

      <h3>12. Inspecții anuale pentru mașini vechi</h3>
      <p>
        Pentru vehiculele mai vechi de 10 ani vor deveni obligatorii inspecții anuale, într-un efort de a preveni
        accidentele cauzate de uzură.
      </p>

      <h2>Concluzii</h2>
      <p>
        Toate aceste măsuri vizează reducerea fraudelor sistematice care au dus la creșterea prețurilor RCA cu până la
        30% în unele zone. Principalele direcții sunt digitalizarea, transparența și controlul în timp real al
        proceselor, pentru a elimina spațiile de manevră care permit fraudele în sistemul actual.
      </p>
    </BlogLayout>
  )
}
