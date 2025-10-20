import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de Confidențialitate - autopeloc.ro | MOTIONLINK SRL",
  description:
    "Politica de confidențialitate MOTIONLINK SRL - Cum colectăm, utilizăm și protejăm datele cu caracter personal în conformitate cu GDPR.",
  keywords: "politica confidentialitate, protectia datelor, GDPR, date personale, MOTIONLINK SRL, autopeloc",
  openGraph: {
    title: "Politica de Confidențialitate - autopeloc.ro",
    description: "Informații despre colectarea și protecția datelor cu caracter personal",
    type: "website",
  },
  alternates: {
    canonical: "https://autopeloc.ro/politica-confidentialitate",
  },
}

export default function PoliticaConfidentialitate() {
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
              Politica de Confidențialitate
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
            {/* Date operator */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">1. Date operator</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Operatorul datelor:</strong> MOTIONLINK SRL
                </p>
                <p>
                  <strong className="text-foreground">CUI:</strong> 50659866
                </p>
                <p>
                  <strong className="text-foreground">Nr. înregistrare / J:</strong> J2024028773009
                </p>
                <p>
                  <strong className="text-foreground">Sediu:</strong> Str. Castor 52 A, Arad, 310215
                </p>
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:contact@motion-link.ro" className="text-teal hover:underline">
                    contact@motion-link.ro
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Telefon:</strong>{" "}
                  <a href="tel:+40790743974" className="text-teal hover:underline">
                    +40 790 743 974
                  </a>
                </p>
              </div>
            </div>

            {/* Domeniu de aplicare */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">2. Domeniu de aplicare</h2>
              <p className="text-muted-foreground leading-relaxed">
                Prezenta politică descrie modul în care MotionLink colectează, utilizează, stochează și protejează
                datele cu caracter personal ale vizitatorilor site-ului și ale clienților (persoane fizice), în relație
                cu serviciile oferite (cereri mașină la schimb, consultanță dosar daună, abonamente, flote etc.). Se
                aplică tuturor canalelor online administrate de MotionLink (site, formulare, email, apeluri telefonice).
              </p>
            </div>

            {/* Date colectate */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">3. Date colectate</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Putem colecta, după caz:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">date de identificare:</strong> nume și prenume; CNP sau alte
                    identificatoare numai dacă sunt necesare pentru servicii specifice;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">date de contact:</strong> număr de telefon, adresă email, adresă
                    de livrare;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">date privind vehiculul și incidentul:</strong> număr
                    înmatriculare, detalii despre accident, nota de constatare, fotografii / documente (PDF, JPG);
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">date tehnice:</strong> IP, date cookie, tip browser, date de
                    accesare;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>orice alte date furnizate voluntar în cursul comunicării cu noi.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Colectarea se face direct de la tine prin formulare, email, telefon sau prin parteneri/agregatori
                autorizați.
              </p>
            </div>

            {/* Scopuri și temeiuri legale */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                4. Scopuri și temeiuri legale pentru prelucrare
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Prelucrăm date pe baza următoarelor temeiuri:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">executarea unui contract sau acțiuni precontractuale</strong>{" "}
                    (ex.: gestionarea cererii pentru mașină la schimb).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">îndeplinirea obligațiilor legale</strong> (ex.: evidențe
                    contabile, arhivarea documentelor legale).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">interes legitim</strong> (ex.: prevenirea fraudei, îmbunătățirea
                    serviciilor, securitatea platformei) — cu evaluarea echilibrului între interesele noastre și
                    drepturile tale.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    <strong className="text-foreground">consimțământul tău</strong> atunci când este necesar (ex.:
                    pentru marketing direct, cookie-uri non-esențiale).
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Fiecare scop va fi comunicat clar în momentul colectării datelor.
              </p>
            </div>

            {/* Destinatari */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                5. Destinatari / transferul datelor
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Datele pot fi comunicate către:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>furnizori de servicii tehnice și IT (hosting, servicii cloud, procesare plăți);</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    parteneri pentru evaluări/expertize (ex.: furnizori de expertize tehnice) și asigurători, atunci
                    când sunt necesare pentru derularea serviciului;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>autorități publice, conform obligațiilor legale.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Dacă sunt efectuate transferuri către terți în afara SEE, acestea vor fi realizate doar pe baza unui
                temei legal adecvat (decizii de protecție adecvată, clauze contractuale standard etc.).
              </p>
            </div>

            {/* Perioada de stocare */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">6. Perioada de stocare</h2>
              <p className="text-muted-foreground leading-relaxed">
                Păstrăm datele atât timp cât este necesar pentru a îndeplini scopurile pentru care au fost colectate,
                respectând termenele legale aplicabile (ex.: arhivare contabilă) și perioade rezonabile pentru
                garanții/soluționarea litigiilor. Detalii specifice pentru fiecare tip de date vor fi comunicate la
                momentul colectării.
              </p>
            </div>

            {/* Drepturile persoanei vizate */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">7. Drepturile persoanei vizate</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ai dreptul, în condițiile legii, să soliciți:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>acces la datele tale;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>rectificarea datelor inexacte;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>ștergerea („dreptul de a fi uitat"), în condițiile prevăzute de legislație;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>restricționarea prelucrării;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>opoziție față de prelucrare (inclusiv pentru marketing direct);</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-teal rounded-full mt-2" />
                  <span>
                    portabilitatea datelor (când prelucrarea se bazează pe consimțământ sau contract și se realizează
                    automatizat).
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Solicitările se vor transmite la{" "}
                <a href="mailto:contact@motion-link.ro" className="text-teal hover:underline">
                  contact@motion-link.ro
                </a>
                ; vom răspunde în termenul legal (maxim 1 lună, cu posibilă prelungire justificată).
              </p>
            </div>

            {/* Responsabil cu protecția datelor */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                8. Responsabil cu protecția datelor / contact
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Pentru exercitarea drepturilor sau întrebări legate de protecția datelor:{" "}
                <a href="mailto:contact@motion-link.ro" className="text-teal hover:underline">
                  contact@motion-link.ro
                </a>
                , telefon{" "}
                <a href="tel:+40790743974" className="text-teal hover:underline">
                  +40 790 743 974
                </a>
                . Dacă nu ești mulțumit de răspuns, poți depune plângere la Autoritatea Națională de Supraveghere a
                Prelucrării Datelor cu Caracter Personal (ANSPDCP).
              </p>
            </div>

            {/* Cookie-uri */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                9. Cookie-uri și tehnologii asemănătoare
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Folosim cookie-uri esențiale pentru funcționarea site-ului. Pentru cookie-uri analitice, marketing sau
                de personalizare, cerem consimțământul utilizatorului prin bannerul de cookie-uri conform practicii
                prezentate în politica noastră de cookie-uri. Poți gestiona preferințele cookie în setările site-ului.
                (Ex.: Google Analytics, Facebook Pixel — dacă sunt utilizate, vor fi listate în politica de cookie).
              </p>
            </div>

            {/* Securitatea datelor */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">10. Securitatea datelor</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementăm măsuri tehnice și organizatorice rezonabile pentru protejarea datelor (control acces,
                criptare, backup, politici interne). Accesul la date este permis doar personalului autorizat și
                furnizorilor care au obligații contractuale de confidențialitate.
              </p>
            </div>

            {/* Transferuri către terți */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                11. Transferuri către terți (procesatori)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Furnizorii/partenerii care prelucrează date în numele MotionLink (procesatori) semnează contracte care
                impun măsuri de protecție a datelor și respectarea instrucțiunilor noastre. Listele principale ale
                procesatorilor (hosting, email, analytics, procesare plăți) sunt puse la dispoziție la cerere.
              </p>
            </div>

            {/* Modificări ale politicii */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">12. Modificări ale politicii</h2>
              <p className="text-muted-foreground leading-relaxed">
                Politica poate fi actualizată; modificările majore vor fi comunicate prin site sau email. Data ultimei
                modificări este afișată în partea de sus.
              </p>
            </div>

            {/* Informații suplimentare */}
            <div className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                13. Informații suplimentare și contact
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pentru clarificări, transmitere de solicitări privind datele personale sau exercitarea drepturilor:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:contact@motion-link.ro" className="text-teal hover:underline">
                    contact@motion-link.ro
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Telefon:</strong>{" "}
                  <a href="tel:+40790743974" className="text-teal hover:underline">
                    +40 790 743 974
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Sediu:</strong> Str. Castor 52 A, Arad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
