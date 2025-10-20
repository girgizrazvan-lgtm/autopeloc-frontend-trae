import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politica de Cookie-uri | autopeloc.ro",
  description: "Politica de cookie-uri a autopeloc.ro - Informații despre utilizarea cookie-urilor pe site-ul nostru.",
  alternates: {
    canonical: "https://autopeloc.ro/politica-cookies",
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-teal/5 to-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 border-b border-teal/20 dark:border-teal/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Politica de{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Cookie-uri</span>
          </h1>
          <p className="text-lg text-muted-foreground">Ultima actualizare: 12 octombrie 2025</p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section 1 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Scopul acestei politici</h2>
            <p className="text-muted-foreground leading-relaxed">
              Prezenta politică explică modul în care <strong>MOTIONLINK SRL</strong> (denumită în continuare
              „MotionLink", „noi" sau „operatorul") utilizează cookie-uri și tehnologii similare pe site-ul{" "}
              <strong>autopeloc.ro</strong> pentru a îmbunătăți experiența utilizatorilor, a analiza traficul și a
              personaliza conținutul.
            </p>
          </div>

          {/* Section 2 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Ce sunt cookie-urile</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău (computer, tabletă, telefon) atunci când
              vizitezi un site web. Ele permit recunoașterea browserului tău și ajută la funcționarea corectă a
              site-ului, la colectarea de informații statistice sau la personalizarea conținutului.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">Există două tipuri principale:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Cookie-uri de sesiune:</strong> se șterg automat la închiderea browserului.
              </li>
              <li>
                <strong>Cookie-uri persistente:</strong> rămân pe dispozitiv până la expirare sau ștergere manuală.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Tipuri de cookie-uri utilizate</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">a) Cookie-uri esențiale</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Necesare pentru funcționarea corectă a site-ului. Nu pot fi dezactivate.</li>
                  <li>Exemple: autentificare formular, salvare preferințe, securitate.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">b) Cookie-uri de analiză (statistice)</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Ne ajută să înțelegem cum este utilizat site-ul (ex: pagini vizitate, durata sesiunii).</li>
                  <li>Instrumente utilizate: Google Analytics, Search Console.</li>
                  <li>Datele sunt agregate și anonime.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  c) Cookie-uri de marketing / personalizare
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>
                    Folosite pentru afișarea de reclame relevante și pentru remarketing (ex. Meta Pixel, Google Ads
                    Tag).
                  </li>
                  <li>Aceste cookie-uri se activează doar cu acordul tău explicit.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Consimțământul utilizatorului</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                La prima accesare a site-ului, un banner de consimțământ permite alegerea tipurilor de cookie-uri
                acceptate.
              </li>
              <li>
                Poți modifica oricând preferințele prin secțiunea „Setări cookie" de pe site sau prin ștergerea
                cookie-urilor din browser.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Cum poți controla cookie-urile</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Majoritatea browserelor permit gestionarea cookie-urilor:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Options → Privacy → Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy
              </li>
              <li>
                <strong>Edge:</strong> Settings → Cookies and site permissions
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Blocarea cookie-urilor esențiale poate afecta funcționarea corectă a site-ului.
            </p>
          </div>

          {/* Section 6 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Durata de stocare</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Durata variază în funcție de tipul cookie-ului:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Cookie-uri esențiale:</strong> pe durata sesiunii
              </li>
              <li>
                <strong>Cookie-uri analitice / marketing:</strong> între 1 lună și 12 luni, în funcție de platformă
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Cookie-uri terțe</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unele cookie-uri pot fi plasate de servicii externe (terți) precum:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Google Analytics / Google Ads</li>
              <li>Meta (Facebook / Instagram)</li>
              <li>LinkedIn Insights</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Acești terți pot colecta date conform propriilor politici de confidențialitate.
            </p>
          </div>

          {/* Section 8 */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Actualizarea politicii</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Ne rezervăm dreptul de a actualiza această politică în funcție de modificările legislative sau tehnice.
              </li>
              <li>Data ultimei actualizări este afișată în partea superioară a paginii.</li>
            </ul>
          </div>

          {/* Section 9 - Contact */}
          <div className="neon-card-glow backdrop-blur-md bg-white/95 dark:bg-gray-900/98 rounded-2xl p-8 border-t-2 border-teal-500/40 shadow-lg shadow-teal/10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pentru întrebări legate de politica de cookie-uri sau de prelucrarea datelor personale:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>MOTIONLINK SRL</strong>
              </p>
              <p>Str. Castor 52A, Arad, România</p>
              <p>
                Email:{" "}
                <a href="mailto:contact@motion-link.ro" className="text-teal-600 dark:text-teal-400 hover:underline">
                  contact@motion-link.ro
                </a>
              </p>
              <p>
                Telefon:{" "}
                <a href="tel:+40790743974" className="text-teal-600 dark:text-teal-400 hover:underline">
                  +40 790 743 974
                </a>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-teal/40"
            >
              Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
