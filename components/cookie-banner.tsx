"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-card border-t border-border shadow-lg mb-20 md:mb-0"
      style={{ marginBottom: "max(5rem, calc(5rem + env(safe-area-inset-bottom)))" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">Utilizăm cookie-uri</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Folosim cookie-uri pentru a îmbunătăți experiența ta pe site-ul nostru, pentru a analiza traficul și pentru
            a personaliza conținutul. Continuând să navighezi pe site, ești de acord cu utilizarea cookie-urilor.{" "}
            <a href="/politica-cookies" className="underline hover:text-foreground transition-colors">
              Află mai multe
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleReject} className="flex-1 sm:flex-none bg-transparent">
            Refuză
          </Button>
          <Button onClick={handleAccept} className="flex-1 sm:flex-none">
            Acceptă
          </Button>
        </div>
      </div>
    </div>
  )
}
