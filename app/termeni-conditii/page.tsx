import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termeni și Condiții - autopeloc.ro | MOTIONLINK SRL",
  description:
    "Termeni și condiții de utilizare a site-ului autopeloc.ro - Informații despre serviciile oferite, drepturi și obligații.",
  keywords: "termeni conditii, utilizare site, servicii auto, MOTIONLINK SRL, autopeloc",
  openGraph: {
    title: "Termeni și Condiții - autopeloc.ro",
    description: "Termeni și condiții de utilizare a serviciilor autopeloc.ro",
    type: "website",
  },
  alternates: {
    canonical: "https://autopeloc.ro/termeni-conditii",
  },
}

export default function TermeniConditii() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-block mb-6 px-4 py-2 bg-teal/10 border border-teal/30 rounded-full">
              <span className="text-sm font-semibold text-teal">Ultima actualizare: 12 octombrie 2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Termeni și Condiții de Utilizare
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              MOTIONLINK SRL
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

        <div className="container relative mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Informații generale */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">1. Informații generale</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Site-ul autopeloc.ro este administrat de MOTIONLINK SRL, cu sediul în Str. Castor 52A, Arad, România,
                CUI 50659866, înregistrată la Registrul Comerțului sub nr. J02/2873/2024, denumită în continuare
                „Operatorul" sau „MotionLink".
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Accesarea și utilizarea site-ului implică acceptarea necondiționată a prezentelor Termeni și Condiții.
                Dacă nu ești de acord, te rugăm să nu folosești acest site.
              </p>
            </div>

            {/* Scopul site-ului */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">2. Scopul site-ului</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Site-ul autopeloc.ro are scop informativ și operațional, oferind:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    informații despre serviciile de mobilitate oferite de MotionLink (mașină la schimb, consultanță
                    daune, expertize, flote etc.);
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>posibilitatea de a transmite cereri de servicii sau de contact;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>prezentarea parteneriatelor și ofertelor disponibile.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Folosirea site-ului nu constituie un contract automat între utilizator și MotionLink, ci o solicitare de
                contact sau ofertă, care va fi confirmată ulterior în scris sau telefonic.
              </p>
            </div>

            {/* Serviciile oferite */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">3. Serviciile oferite</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Serviciile prezentate pe site includ, dar nu se limitează la:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>Mașină la schimb RCA / CASCO / mecanică</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>Consultanță dosar daună și asistență în relația cu asigurătorii</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>Expertize tehnice / evaluări de daune în parteneriat cu Careval</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>Asigurări RCA & CASCO prin parteneri autorizați</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>Abonamente Recovery A24 (asistență rutieră)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>Flote & parteneriate B2B</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>Închirieri auto avantajoase pentru membri #peloc</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                MotionLink acționează ca intermediar între client și partenerii săi (flote auto, service-uri,
                asigurători, experți tehnici). Toate serviciile sunt prestate conform legislației române și contractelor
                încheiate cu părțile implicate.
              </p>
            </div>

            {/* Drepturile și obligațiile utilizatorilor */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                4. Drepturile și obligațiile utilizatorilor
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Utilizatorii se angajează:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>să folosească site-ul doar în scopuri legale;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>să furnizeze informații reale și complete în formulare;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>să nu transmită conținut ilegal, defăimător, abuziv sau dăunător;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>să nu încerce accesarea neautorizată a componentelor tehnice ale site-ului.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                MotionLink își rezervă dreptul de a refuza cererile incomplete, false sau care nu corespund criteriilor
                de eligibilitate ale serviciilor.
              </p>
            </div>

            {/* Limitarea răspunderii */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">5. Limitarea răspunderii</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                MotionLink depune toate eforturile pentru a menține informațiile corecte și actualizate. Totuși, nu
                garantează că:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>informațiile sunt mereu complete sau fără erori;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>serviciul va funcționa neîntrerupt sau fără erori tehnice.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                MotionLink nu poate fi făcută responsabilă pentru:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>daune indirecte cauzate de utilizarea sau imposibilitatea utilizării site-ului;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>erori cauzate de terți (parteneri, furnizori, platforme de hosting etc.);</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>interpretarea eronată a informațiilor publicate.</span>
                </li>
              </ul>
            </div>

            {/* Proprietate intelectuală */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">6. Proprietate intelectuală</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conținutul site-ului (texte, imagini, logo-uri, elemente grafice, cod sursă) este proprietatea
                MotionLink SRL și este protejat de legislația română privind drepturile de autor și proprietatea
                intelectuală.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Folosirea, copierea, distribuirea sau modificarea conținutului fără acordul scris al MotionLink este
                interzisă.
              </p>
            </div>

            {/* Confidențialitate și protecția datelor */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                7. Confidențialitate și protecția datelor
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Prelucrarea datelor personale se face conform Politicii de Confidențialitate, disponibilă la adresa:{" "}
                <a href="/politica-confidentialitate" className="text-teal hover:underline">
                  https://autopeloc.ro/politica-confidentialitate
                </a>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Prin completarea formularelor de pe site, utilizatorul își exprimă acordul pentru prelucrarea datelor
                personale strict în scopurile indicate (contact, ofertare, evaluare dosar etc.).
              </p>
            </div>

            {/* Linkuri externe și parteneri */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">8. Linkuri externe și parteneri</h2>
              <p className="text-muted-foreground leading-relaxed">
                Site-ul poate conține linkuri către pagini externe (service-uri partenere, asigurători, platforme de
                rezervări). MotionLink nu își asumă responsabilitatea pentru conținutul, politica de confidențialitate
                sau securitatea acelor site-uri.
              </p>
            </div>

            {/* Modificări ale termenilor */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">9. Modificări ale termenilor</h2>
              <p className="text-muted-foreground leading-relaxed">
                MotionLink poate modifica acești Termeni și Condiții în orice moment, fără notificare prealabilă.
                Versiunea actualizată va fi publicată pe site, cu data ultimei revizuiri. Utilizarea continuată a
                site-ului după publicarea modificărilor reprezintă acceptarea noilor termeni.
              </p>
            </div>

            {/* Legea aplicabilă și jurisdicția */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                10. Legea aplicabilă și jurisdicția
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Prezentul document este guvernat de legislația română.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Orice dispută apărută între MotionLink și utilizator va fi soluționată pe cale amiabilă, iar dacă acest
                lucru nu este posibil, litigiul va fi înaintat instanțelor competente din Arad, România.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">11. Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pentru întrebări legate de acești termeni, te rugăm să ne contactezi la:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">MOTIONLINK SRL</strong>
                </p>
                <p>Str. Castor 52A, Arad, România</p>
                <p>
                  <strong className="text-foreground">Tel:</strong>{" "}
                  <a href="tel:+40790743974" className="text-teal hover:underline">
                    +40 790 743 974
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:contact@motion-link.ro" className="text-teal hover:underline">
                    contact@motion-link.ro
                  </a>
                </p>
              </div>
            </div>

            {/* Soluționarea alternativă a litigiilor și protecția consumatorului */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                12. Soluționarea alternativă a litigiilor și protecția consumatorului
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Platforma europeană SOL</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    În cazul unui litigiu, consumatorul are dreptul să apeleze la mecanismele de soluționare alternativă
                    a litigiilor disponibile prin platforma europeană SOL (Online Dispute Resolution), disponibilă la
                    adresa:{" "}
                    <a
                      href="https://ec.europa.eu/consumers/odr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal hover:underline"
                    >
                      https://ec.europa.eu/consumers/odr
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Autoritatea Națională pentru Protecția Consumatorilor (ANPC)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    În cazul în care considerați că drepturile dumneavoastră de consumator au fost încălcate, vă puteți
                    adresa Autorității Naționale pentru Protecția Consumatorilor (ANPC).
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Website ANPC:</strong>{" "}
                      <a
                        href="https://anpc.ro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal hover:underline"
                      >
                        https://anpc.ro
                      </a>
                    </p>
                    <p>
                      <strong className="text-foreground">Depunere reclamație online:</strong>{" "}
                      <a
                        href="https://anpc.ro/ce-facem/consumatori/reclamatii"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal hover:underline"
                      >
                        https://anpc.ro/ce-facem/consumatori/reclamatii
                      </a>
                    </p>
                  </div>
                </div>

                <div className="bg-teal/5 border border-teal/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Notă:</strong> Înainte de a apela la aceste mecanisme, vă
                    încurajăm să ne contactați direct pentru a rezolva orice problemă pe cale amiabilă. Suntem dedicați
                    să oferim soluții rapide și satisfăcătoare pentru toți clienții noștri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
