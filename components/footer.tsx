import Link from "next/link"

const PhoneIcon = () => (
  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const MailIcon = () => (
  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const MapPinIcon = () => (
  <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.072-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.069-4.949-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-14.4z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export function Footer() {
  const cities = [
    "București",
    "Craiova",
    "Sibiu",
    "Brașov",
    "Timișoara",
    "Oradea",
    "Cluj-Napoca",
    "Iași",
    "Suceava",
    "Bacău",
  ]

  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-3">
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-0.5 transition-transform group-hover:scale-105">
                  <span className="font-mono text-lg font-light tracking-tight text-foreground">auto</span>
                  <span className="font-mono text-lg font-bold tracking-tight text-teal-600 dark:text-teal-400">
                    pe
                  </span>
                  <span className="font-mono text-lg font-light tracking-tight text-foreground">loc</span>
                  <span className="font-mono text-lg font-light text-teal-600 dark:text-teal-400">.ro</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mobilitatea ta e responsabilitatea noastră.
              </p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                Proiect dezvoltat și administrat de Motion Link.
              </p>
              <div>
                <span className="text-sm font-bold peloc-hash">#pe</span>
                <span className="text-sm font-bold peloc-text">loc</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Link-uri rapide</h3>
              <nav className="flex flex-col gap-1.5">
                <Link
                  href="/masina-inlocuire"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Cum funcționează
                </Link>
                <Link
                  href="/flota-noastra"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Flota noastră
                </Link>
                <Link
                  href="/despre-noi"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Despre noi
                </Link>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Blog
                </Link>
              </nav>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Servicii</h3>
              <nav className="flex flex-col gap-1.5">
                <Link
                  href="/servicii/masina-schimb-rca"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Mașină la schimb RCA
                </Link>
                <Link
                  href="/servicii/consultanta-dosar-dauna"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Consultanță dosar daună
                </Link>
                <Link
                  href="/servicii/expertize-daune-accidente"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Expertize daune
                </Link>
                <Link
                  href="/servicii/asigurari-rca-casco"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Asigurări RCA & CASCO
                </Link>
                <Link
                  href="/servicii/flote-parteneriate"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Flote & parteneriate
                </Link>
                <Link
                  href="/servicii/inchirieri-avantajoase"
                  className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  Închirieri #peloc
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Contact</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:0790743974"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    <PhoneIcon />
                  </div>
                  <span>0790 743 974</span>
                </a>
                <a
                  href="mailto:contact@autopeloc.ro"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    <MailIcon />
                  </div>
                  <span>contact@autopeloc.ro</span>
                </a>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPinIcon />
                  <span>București, România</span>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href="https://www.facebook.com/share/1BRqsH7vGH/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://www.instagram.com/autopeloc.ro?igsh=MWxkeWhocHZtd2p2YQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/autopeloc-ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {cities.map((city) => (
              <div
                key={city}
                className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm text-muted-foreground hover:bg-teal-600/10 hover:border-teal-600/30 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200 cursor-default"
              >
                {city}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/termeni-conditii"
              className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Termeni și condiții
            </Link>
            <span className="text-muted-foreground text-sm">•</span>
            <Link
              href="/politica-confidentialitate"
              className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Confidențialitate
            </Link>
            <span className="text-muted-foreground text-sm">•</span>
            <Link
              href="/politica-cookies"
              className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Cookie-uri
            </Link>
            <span className="text-muted-foreground text-sm">•</span>
            <a
              href="https://anpc.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Protecția consumatorului
            </a>
            <span className="text-muted-foreground text-sm">•</span>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Soluționarea litigiilor
            </a>
          </div>

          <p className="text-sm text-muted-foreground text-center">© 2025 autopeloc.ro. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  )
}
