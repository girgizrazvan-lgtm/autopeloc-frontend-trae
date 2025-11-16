import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Despre Noi - autopeloc.ro | Experiență Internațională în Servicii Auto",
  description:
    "Descoperă povestea autopeloc.ro: peste 10 ani de experiență în automotive premium (Porsche Romania), rent-a-car și soluții moderne de mobilitate din UK (Zipcar, Ubeeqo). Aducem cele mai bune practici europene în România.",
  keywords:
    "despre autopeloc, experiență automotive, Porsche Romania, rent-a-car România, car sharing, mobilitate urbană, Zipcar, Ubeeqo, servicii auto premium",
  openGraph: {
    title: "Despre Noi - autopeloc.ro",
    description:
      "Peste 10 ani de experiență în automotive premium și soluții moderne de mobilitate. De la Porsche Romania la car-sharing european.",
    type: "website",
  },
  alternates: {
    canonical: "https://autopeloc.ro/despre-noi",
  },
}

export default function DespreNoi() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <Breadcrumbs
          items={[
            { name: "Acasă", url: "/" },
            { name: "Despre Noi", url: "/despre-noi" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 bg-teal/10 border border-teal/30 rounded-full">
              <span className="text-sm font-semibold text-teal">Despre Noi</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Experiență internațională în servicii auto și soluții de mobilitate
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              La autopeloc.ro aducem împreună peste un deceniu de experiență în industria automotive și servicii de
              mobilitate, acumulată atât pe piața românească cât și internațională.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Parcursul nostru profesional
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              O călătorie de peste 10 ani prin diferite aspecte ale mobilității moderne
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {/* Porsche Experience */}
            <div className="group relative bg-card border-2 border-border/50 rounded-3xl p-8 md:p-10 hover:border-teal/50 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-teal/10 border-2 border-teal/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-teal">5</span>
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-teal/10 rounded-full text-sm font-semibold text-teal mb-2">
                      Automotive Premium
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Experiența Porsche Romania</h3>
                    <p className="text-muted-foreground">5 ani de automotive premium</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Aventura noastră în industria auto a început în cadrul grupului Porsche Romania, unde am petrecut
                  cinci ani îmbogățind cunoștințele despre standardele înalte de calitate în automotive. Această
                  perioadă ne-a oferit o perspectivă unică asupra:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                    <span>
                      Proceselor de vânzare și service pentru vehicule premium, unde am învățat că fiecare detaliu
                      contează în experiența clientului
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                    <span>
                      Tehnologiilor automotive avansate și tendințelor care modelează industria, de la sisteme de
                      siguranță la inovații în propulsie
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                    <span>
                      Managementului relațiilor cu clienții care au așteptări ridicate și doresc servicii personalizate
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rent-a-car Experience */}
            <div className="group relative bg-card border-2 border-border/50 rounded-3xl p-8 md:p-10 hover:border-teal/50 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue/5 to-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-teal/10 border-2 border-teal/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-teal">2</span>
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-teal/10 rounded-full text-sm font-semibold text-teal mb-2">
                      Expertiză Operațională
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Dezvoltarea în rent-a-car</h3>
                    <p className="text-muted-foreground">2 ani pe piața românească</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Următorul pas în evoluția noastră profesională a fost intrarea în domeniul rent-a-car pe piața
                  românească. Timp de doi ani ne-am concentrat pe dezvoltarea și optimizarea serviciilor de închiriere
                  auto, învățând aspecte esențiale precum:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                    <span>
                      Managementul flotei auto și optimizarea costurilor operaționale pentru sustenabilitatea
                      business-ului
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                    <span>
                      Dezvoltarea proceselor de rezervare și predare-primire care să fie eficiente pentru companie și
                      convenabile pentru clienți
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                    <span>Analiza pieței românești de rent-a-car și identificarea nișelor de oportunitate</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* UK Experience */}
            <div className="group relative bg-card border-2 border-border/50 rounded-3xl p-8 md:p-10 hover:border-teal/50 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-teal/10 border-2 border-teal/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-teal">5</span>
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-teal/10 rounded-full text-sm font-semibold text-teal mb-2">
                      Experiență Internațională
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      Experiența UK - Soluții moderne de mobilitate
                    </h3>
                    <p className="text-muted-foreground">5 ani în Marea Britanie</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Partea poate cea mai valoroasă a experienței noastre vine din cei cinci ani petrecuți în Marea
                  Britanie, unde am avut privilegiul să experimentez și să înțeleg în profunzime piața europeană de
                  soluții alternative de transport urban.
                </p>
                <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 mb-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Ca utilizator intensiv al serviciilor <strong className="text-foreground">Zipcar</strong> și{" "}
                    <strong className="text-foreground">Ubeeqo</strong>, am descoperit cum arată cu adevărat viitorul
                    mobilității urbane:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                      <span>
                        <strong className="text-foreground">Zipcar</strong> ne-a arătat puterea car-sharing-ului
                        comunitar, unde accesul la vehicule devine mai important decât proprietatea
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                      <span>
                        <strong className="text-foreground">Ubeeqo</strong> ne-a demonstrat flexibilitatea sistemelor
                        free-floating, unde poți ridica și lăsa vehiculul oriunde în zonele desemnate
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Această experiență directă ca utilizator ne-a oferit perspective unice asupra comportamentului real al
                  consumatorilor, importanței tehnologiei mobile, modelelor de pricing competitive și provocărilor
                  operaționale din perspectiva utilizatorului final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Nașterea conceptului autopeloc.ro
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              Combinând experiența din automotive premium, cunoștințele operaționale din rent-a-car românesc și
              perspectivele dobândite din piața avansată de mobilitate britanică, am conceput autopeloc.ro ca o
              platformă care să aducă în România cele mai bune practici internaționale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border-2 border-border/50 rounded-3xl p-8 hover:border-teal/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Viziunea noastră</h3>
              <p className="text-muted-foreground leading-relaxed">
                Am observat că piața românească de servicii auto și mobilitate are un potențial imens de dezvoltare, mai
                ales dacă se aplică lecțiile învățate din piețele mature europene. autopeloc.ro își propune să fie
                pionierul acestei transformări.
              </p>
            </div>

            <div className="bg-card border-2 border-border/50 rounded-3xl p-8 hover:border-teal/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Focusul nostru</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ne concentrăm pe dezvoltarea de servicii care să răspundă nevoilor reale ale românilor, fie că vorbim de
                business-uri care caută soluții eficiente de mobilitate pentru angajați, fie de particulari care doresc
                alternative flexibile la proprietatea vehiculului personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Expertiza care ne diferențiază
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="group bg-teal/10 border-2 border-teal/30 rounded-3xl p-8 hover:bg-teal/15 hover:border-teal/50 transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-teal transition-colors">
                Înțelegerea ecosistemului automotive complet
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Experiența acumulată în diverse segmente ale industriei auto ne oferă o perspectivă completă asupra
                nevoilor și provocărilor din acest domeniu. Știm cum gândesc dealerii, înțelegem așteptările clienților
                premium și cunoaștem realitățile operaționale ale companiilor de închiriere.
              </p>
            </div>

            <div className="group bg-teal/10 border-2 border-teal/30 rounded-3xl p-8 hover:bg-teal/15 hover:border-teal/50 transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-teal transition-colors">
                Cunoașterea tendințelor europene în mobilitate
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Timpul petrecut în UK ne-a expus la cele mai avansate concepte de mobilitate urbană și ne-a arătat cum
                arată viitorul transportului în orașele europene. Această experiență ne permite să anticipăm și să
                pregătim piața românească pentru schimbările care vin.
              </p>
            </div>

            <div className="group bg-teal/10 border-2 border-teal/30 rounded-3xl p-8 hover:bg-teal/15 hover:border-teal/50 transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-teal transition-colors">
                Abordarea pragmatică și orientată spre rezultate
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Experiența combinată ne-a învățat că succesul în serviciile de mobilitate vine din echilibrul dintre
                inovație și pragmatism. Știm ce funcționează în teorie și, mai important, ce funcționează în practică.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />

        <div className="container relative mx-auto px-4 max-w-5xl">
          <div className="bg-card border-2 border-border/50 rounded-3xl p-10 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Angajamentul nostru către piața românească
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              La autopeloc.ro ne-am asumat misiunea de a aduce în România cele mai bune practici din serviciile de
              mobilitate europene, adaptate la specificul și nevoile locale. Lucrăm pentru a dezvolta soluții care să
              fie:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-teal rounded-full mt-2" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Accesibile și ușor de înțeles</strong> pentru utilizatorii români,
                  indiferent de nivelul lor de familiaritate cu tehnologia
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-teal rounded-full mt-2" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Eficiente din punct de vedere economic</strong>, oferind
                  alternative reale la modelele tradiționale de transport
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-teal rounded-full mt-2" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Sustenabile pe termen lung</strong>, contribuind la dezvoltarea
                  unei mobilități mai responsabile în România
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-teal rounded-full mt-2" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Scalabile și adaptabile</strong> la evoluția rapidă a
                  tehnologiilor și a așteptărilor consumatorilor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-teal/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            De ce să colaborezi cu autopeloc.ro
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
            Când alegi să lucrezi cu noi, beneficiezi de o experiență unică în piața românească: combinația dintre
            standardele premium Porsche, pragmatismul operațional al rent-a-car-ului local și viziunea internațională
            dobândită în una dintre cele mai avansate piețe de mobilitate din Europa.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-pretty max-w-3xl mx-auto">
            autopeloc.ro nu este doar o companie de servicii auto - este rezultatul unei călătorii de peste zece ani
            prin diferite aspecte ale mobilității moderne, de la luxury automotive la car-sharing comunitar.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:0790743974"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-white rounded-full font-semibold hover:bg-teal/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Contactează-ne acum
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-card border-2 border-border/50 rounded-full font-semibold hover:border-teal/50 hover:bg-card/80 transition-colors duration-300"
            >
              Înapoi la pagina principală
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "autopeloc.ro",
            description:
              "Servicii auto și soluții de mobilitate cu experiență internațională. Peste 10 ani în automotive premium, rent-a-car și car-sharing european.",
            url: "https://autopeloc.ro",
            foundingDate: "2024",
            areaServed: "Romania",
            knowsAbout: [
              "Automotive Premium",
              "Rent-a-car",
              "Car Sharing",
              "Mobilitate Urbană",
              "Servicii Auto",
              "RCA",
            ],
          }),
        }}
      />
    </main>
  )
}
