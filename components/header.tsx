"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useState, useEffect, useRef } from "react"

const PhoneIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServiciiOpen, setIsServiciiOpen] = useState(false)
  const [isMobileServiciiOpen, setIsMobileServiciiOpen] = useState(false)
  const serviciiDropdownRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileServiciiOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviciiDropdownRef.current && !serviciiDropdownRef.current.contains(event.target as Node)) {
        setIsServiciiOpen(false)
      }
    }

    if (isServiciiOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isServiciiOpen])

  return (
    <header className="sticky top-0 z-[100] w-full bg-background border-b">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between h-20 gap-4">
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0 md:justify-self-start">
            <div className="flex items-center gap-0.5">
              <span className="font-mono text-lg font-light text-foreground">auto</span>
              <span className="font-mono text-lg font-bold text-teal-600 dark:text-teal-400">pe</span>
              <span className="font-mono text-lg font-light text-foreground">loc</span>
              <span className="font-mono text-lg font-light text-teal-600 dark:text-teal-400">.ro</span>
            </div>
          </Link>

          {/* Navigation Menu - Center (Desktop only) */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            <a
              href="#pasi-simpli"
              className="relative text-xs font-medium uppercase tracking-wider text-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-600 dark:after:bg-teal-400 after:transition-all hover:after:w-full"
            >
              Cum funcționează
            </a>

            {/* Servicii dropdown menu */}
            <div className="relative" ref={serviciiDropdownRef}>
              <button
                onClick={() => setIsServiciiOpen(!isServiciiOpen)}
                className="relative text-xs font-medium uppercase tracking-wider text-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
              >
                Servicii
                <ChevronDownIcon />
              </button>

              {isServiciiOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-background border border-border rounded-2xl shadow-xl py-2 z-50">
                  <Link
                    href="/servicii/masina-schimb-rca"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    onClick={() => setIsServiciiOpen(false)}
                  >
                    Mașină la schimb RCA
                  </Link>
                  <Link
                    href="/servicii/consultanta-dosar-dauna"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    onClick={() => setIsServiciiOpen(false)}
                  >
                    Consultanță dosar daună
                  </Link>
                  <Link
                    href="/servicii/expertize-daune-accidente"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    onClick={() => setIsServiciiOpen(false)}
                  >
                    Expertize daune & reconstituire accidente
                  </Link>
                  <Link
                    href="/servicii/asigurari-rca-casco"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    onClick={() => setIsServiciiOpen(false)}
                  >
                    Asigurări RCA & CASCO
                  </Link>
                  <Link
                    href="/servicii/flote-parteneriate"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    onClick={() => setIsServiciiOpen(false)}
                  >
                    Flote & parteneriate
                  </Link>
                  <Link
                    href="/servicii/inchirieri-avantajoase"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    onClick={() => setIsServiciiOpen(false)}
                  >
                    Închirieri avantajoase #peloc
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/flota-noastra"
              className="relative text-xs font-medium uppercase tracking-wider text-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-600 dark:after:bg-teal-400 after:transition-all hover:after:w-full"
            >
              Flota noastră
            </Link>

            <Link
              href="/despre-noi"
              className="relative text-xs font-medium uppercase tracking-wider text-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-600 dark:after:bg-teal-400 after:transition-all hover:after:w-full"
            >
              Despre noi
            </Link>
          </nav>

          {/* Availability, Theme Toggle, and Phone CTA - Right */}
          <div className="flex items-center justify-end gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-medium text-foreground whitespace-nowrap">disponibil non-stop</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">luni-duminică</span>
            </div>
            <ThemeToggle />
            <a
              href="tel:0790743974"
              className="hidden lg:flex items-center gap-2 rounded-full bg-teal-600 dark:bg-teal-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-teal-700 dark:hover:bg-teal-600 transition-all whitespace-nowrap"
            >
              <PhoneIcon />
              <span className="hidden xs:inline">0790 743 974</span>
              <span className="xs:hidden">Sună</span>
            </a>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-border">
          <Link href="/" onClick={closeMobileMenu} className="flex-shrink-0">
            <div className="flex items-center gap-0.5">
              <span className="font-mono text-base font-light text-foreground">auto</span>
              <span className="font-mono text-base font-bold text-teal-600 dark:text-teal-400">pe</span>
              <span className="font-mono text-base font-light text-foreground">loc</span>
              <span className="font-mono text-base font-light text-teal-600 dark:text-teal-400">.ro</span>
            </div>
          </Link>
          <button
            onClick={closeMobileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <XIcon />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-6">
          <a
            href="#pasi-simpli"
            onClick={closeMobileMenu}
            className="text-xs font-medium uppercase tracking-wide text-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-3 px-4 rounded-lg"
          >
            Cum funcționează
          </a>

          {/* Mobile Servicii expandable section */}
          <div>
            <button
              onClick={() => setIsMobileServiciiOpen(!isMobileServiciiOpen)}
              className="w-full flex items-center justify-between text-xs font-medium uppercase tracking-wide text-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-3 px-4 rounded-lg"
            >
              Servicii
              <ChevronDownIcon />
            </button>
            {isMobileServiciiOpen && (
              <div className="flex flex-col gap-1 pl-4 mt-1">
                <Link
                  href="/servicii/masina-schimb-rca"
                  onClick={closeMobileMenu}
                  className="text-xs text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-2 px-4 rounded-lg"
                >
                  Mașină la schimb RCA
                </Link>
                <Link
                  href="/servicii/consultanta-dosar-dauna"
                  onClick={closeMobileMenu}
                  className="text-xs text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-2 px-4 rounded-lg"
                >
                  Consultanță dosar daună
                </Link>
                <Link
                  href="/servicii/expertize-daune-accidente"
                  onClick={closeMobileMenu}
                  className="text-xs text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-2 px-4 rounded-lg"
                >
                  Expertize daune & reconstituire
                </Link>
                <Link
                  href="/servicii/asigurari-rca-casco"
                  onClick={closeMobileMenu}
                  className="text-xs text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-2 px-4 rounded-lg"
                >
                  Asigurări RCA & CASCO
                </Link>
                <Link
                  href="/servicii/flote-parteneriate"
                  onClick={closeMobileMenu}
                  className="text-xs text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-2 px-4 rounded-lg"
                >
                  Flote & parteneriate
                </Link>
                <Link
                  href="/servicii/inchirieri-avantajoase"
                  onClick={closeMobileMenu}
                  className="text-xs text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-2 px-4 rounded-lg"
                >
                  Închirieri avantajoase #peloc
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/flota-noastra"
            onClick={closeMobileMenu}
            className="text-xs font-medium uppercase tracking-wide text-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-3 px-4 rounded-lg"
          >
            Flota noastră
          </Link>

          <Link
            href="/despre-noi"
            onClick={closeMobileMenu}
            className="text-xs font-medium uppercase tracking-wide text-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-colors py-3 px-4 rounded-lg"
          >
            Despre noi
          </Link>

          <div className="flex flex-col gap-1 mt-6 pt-6 border-t border-border">
            <span className="text-sm font-medium text-foreground">disponibil non-stop</span>
            <span className="text-sm text-muted-foreground">luni-duminică</span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40"
          onClick={closeMobileMenu}
        />
      )}
    </header>
  )
}
