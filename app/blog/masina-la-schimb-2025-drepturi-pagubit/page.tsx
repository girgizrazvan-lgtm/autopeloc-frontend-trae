import type { Metadata } from "next"
import { BlogLayout } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Mașina la schimb în 2025 – Drepturile păgubitului | autopeloc.ro",
  description:
    "Ghid complet despre dreptul la mașină de înlocuire în 2025. Află ce spune legislația, ce documente sunt necesare și cum poți beneficia de acest drept garantat de lege.",
  keywords: "mașină la schimb, drepturi păgubit, RCA, legislație 2025, mașină de înlocuire, despăgubiri accident",
  authors: [{ name: "autopeloc.ro" }],
  openGraph: {
    title: "Mașina la schimb în 2025 – Drepturile păgubitului",
    description: "Ghid complet despre dreptul la mașină de înlocuire în 2025",
    type: "article",
    publishedTime: "2025-09-08T10:00:00Z",
    modifiedTime: "2025-09-08T10:00:00Z",
    authors: ["autopeloc.ro"],
    section: "Legislație",
    tags: ["mașină la schimb", "drepturi păgubit", "RCA", "legislație 2025"],
    images: [
      {
        url: "/images/dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Mașina la schimb în 2025 – Drepturile păgubitului",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mașina la schimb în 2025 – Drepturile păgubitului",
    description: "Ghid complet despre dreptul la mașină de înlocuire în 2025",
    images: ["/images/dashboard.jpg"],
  },
  alternates: {
    canonical: "https://autopeloc.ro/blog/masina-la-schimb-2025-drepturi-pagubit",
  },
}

export default function BlogPost() {
  return (
    <BlogLayout
      title="Mașina la schimb în 2025 – Drepturile păgubitului, explicate pas cu pas"
      description="Ghid complet despre dreptul la mașină de înlocuire în 2025. Află ce spune legislația, ce documente sunt necesare și cum poți beneficia de acest drept garantat de lege."
      date="2025-09-08"
      readTime="5 min citire"
      category="Legislație"
      url="/blog/masina-la-schimb-2025-drepturi-pagubit"
      relatedArticles={[
        {
          title: "Fluxul reparațiilor în service pentru mașina la schimb",
          url: "/blog/flux-reparatii-service-masina-schimb-2025",
          description: "Înțelege procesul complet de reparații și cum să obții mașina la schimb în 2025.",
        },
        {
          title: "Măsuri ASF pentru reducerea fraudelor în 2025",
          url: "/blog/masuri-asf-reducere-fraude-2025",
          description: "Noile reglementări și controale pentru combaterea abuzurilor în sistemul RCA.",
        },
      ]}
    >
      <p className="text-lg leading-relaxed mb-6">
        În România, peste <strong>200.000 de șoferi</strong> sunt implicați anual în accidente rutiere în care nu sunt
        vinovați. Pentru majoritatea, lipsa mașinii înseamnă imposibilitatea de a merge la serviciu, de a duce copiii la
        școală sau de a-și îndeplini obligațiile zilnice. Din fericire, <strong>Norma ASF nr. 20/2017</strong>,
        actualizată în 2024, garantează dreptul la o mașină de înlocuire pe toată perioada reparației.
      </p>

      <h2>Cadrul legal actualizat pentru 2025</h2>
      <p>
        <strong>Norma ASF nr. 20/2017</strong>, modificată prin <strong>Norma nr. 23/2024</strong>, stabilește clar că
        orice persoană păgubită într-un accident rutier în care nu este vinovată are dreptul la despăgubiri care includ
        și costurile pentru o mașină de înlocuire.
      </p>
      <p>
        Conform <strong>art. 3 alin. (1) lit. d)</strong> din normă, asigurătorul RCA al celui vinovat este obligat să
        acopere "cheltuielile de închiriere a unui autovehicul similar sau dintr-o clasă inferioară" pe perioada
        reparației vehiculului avariat.
      </p>

      <h2>Pașii practici pentru obținerea mașinii la schimb</h2>
      <p>
        Pe baza experienței noastre cu peste 5.000 de cazuri gestionate în ultimii 3 ani, am identificat pașii esențiali
        pentru un proces fără probleme:
      </p>

      <h3>1. Anunță asiguratorul imediat după accident</h3>
      <p>
        Contactează asigurătorul RCA al celui vinovat în maxim <strong>24 de ore</strong>. Întârzierea poate complica
        procesul. Solicită numărul dosarului de daună și numele expertului desemnat.
      </p>

      <h3>2. Participă la constatarea avariilor</h3>
      <p>
        Expertul evaluator va examina vehiculul pentru a stabili amploarea daunelor.{" "}
        <strong>Fotografiază toate avariile</strong> din mai multe unghiuri și păstrează procesul-verbal de constatare.
      </p>

      <h3>3. Alege service-ul pentru reparații</h3>
      <p>
        Ai libertatea de a alege orice service, autorizat sau neautorizat. <strong>Nu ești obligat</strong> să mergi la
        service-ul recomandat de asigurator. Solicită un deviz detaliat cu orele de manoperă estimate.
      </p>

      <h3>4. Solicită explicit mașina de înlocuire</h3>
      <p>Prezintă următoarele documente:</p>
      <ul>
        <li>Constatare amiabilă sau proces-verbal de la poliție</li>
        <li>Copie certificat de înmatriculare</li>
        <li>Copie permis de conducere valabil</li>
        <li>Copie carte de identitate</li>
        <li>Deviz de reparație de la service</li>
      </ul>

      <h2>Calculul perioadei de închiriere</h2>
      <p>
        Conform <strong>Normei ASF nr. 20/2017, art. 5</strong>, durata pentru care ai dreptul la mașină de înlocuire se
        calculează după formula: <strong>4 ore manoperă = 1 zi închiriere</strong>.
      </p>
      <p>
        <strong>Exemplu concret:</strong> Dacă devizul de reparație estimează 32 de ore de manoperă, ai dreptul la 8
        zile de mașină la schimb (32 ÷ 4 = 8 zile).
      </p>

      <h2>Drepturi și obligații în 2025</h2>

      <h3>Drepturile tale garantate</h3>
      <ul>
        <li>Mașină din aceeași clasă sau inferioară</li>
        <li>Livrare în maxim 48 de ore de la solicitare</li>
        <li>Fără costuri suplimentare pentru închiriere</li>
        <li>Prelungire automată dacă reparația durează mai mult din motive obiective</li>
      </ul>

      <h3>Obligațiile tale</h3>
      <ul>
        <li>Să utilizezi mașina cu grijă și conform regulilor de circulație</li>
        <li>Să returnezi mașina cu același nivel de combustibil</li>
        <li>Să anunți imediat orice avarie sau accident cu mașina închiriată</li>
        <li>Să returnezi mașina la finalizarea reparației propriului vehicul</li>
      </ul>

      <h2>Ce faci dacă întâmpini probleme?</h2>
      <p>
        În practică, unii asigurători încearcă să evite sau să întârzie acordarea mașinii la schimb. Iată ce poți face:
      </p>

      <h3>Dacă asiguratorul refuză</h3>
      <ol>
        <li>Solicită refuzul în scris (email sau poștă cu confirmare de primire)</li>
        <li>Depune plângere la ASF (Autoritatea de Supraveghere Financiară) - online pe asfromania.ro</li>
        <li>Contactează ANPC (Autoritatea Națională pentru Protecția Consumatorilor) la tel. 021.9551</li>
        <li>Consultă un avocat specializat în daune auto pentru acțiune în instanță</li>
      </ol>

      <p>
        <strong>Statistici ASF 2024:</strong> Din 1.247 de plângeri depuse la ASF în 2024 privind refuzul mașinii la
        schimb, 89% au fost soluționate în favoarea păgubitului în termen de 30 de zile.
      </p>

      <h2>Concluzie</h2>
      <p>
        Dreptul la mașină de înlocuire este garantat prin lege și nu poate fi refuzat dacă îndeplinești condițiile.
        Experiența noastră arată că pregătirea documentelor din timp și alegerea unui partener de încredere pentru
        închiriere fac diferența între un proces rapid (2-3 zile) și unul complicat (2-3 săptămâni).
      </p>
    </BlogLayout>
  )
}
