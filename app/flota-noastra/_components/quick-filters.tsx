"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { carClasses } from "@/lib/fleet-data"

export function QuickFilters() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("Toate")
  const [activeTransmission, setActiveTransmission] = useState("Toate")

  const categories = ["Toate", ...carClasses.map((c) => c.title)]
  const transmissions = ["Toate", "Manual", "Automat"]

  useEffect(() => {
    const cat = searchParams.get("cat")
    const trans = searchParams.get("trans")
    if (cat) {
      setActiveCategory(cat)
    }
    if (trans) {
      setActiveTransmission(trans)
    }
  }, [searchParams])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)

    const params = new URLSearchParams(window.location.search)
    if (category === "Toate") {
      params.delete("cat")
    } else {
      params.set("cat", category)
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    window.history.pushState({}, "", newUrl)

    window.dispatchEvent(new CustomEvent("categoryChange", { detail: category }))

    setTimeout(() => {
      const element = document.getElementById("toate-modelele")
      element?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleTransmissionClick = (transmission: string) => {
    setActiveTransmission(transmission)

    const params = new URLSearchParams(window.location.search)
    if (transmission === "Toate") {
      params.delete("trans")
    } else {
      params.set("trans", transmission)
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    window.history.pushState({}, "", newUrl)

    window.dispatchEvent(new CustomEvent("transmissionChange", { detail: transmission }))

    setTimeout(() => {
      const element = document.getElementById("toate-modelele")
      element?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="bg-background border-b border-border/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          {/* Category filters */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category ? "bg-teal-600 text-white" : "bg-muted/50 text-foreground hover:bg-muted"
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Transmission filter - minimalist design */}
          <div className="flex items-center justify-center gap-2">
            {transmissions.map((transmission) => (
              <button
                key={transmission}
                onClick={() => handleTransmissionClick(transmission)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  activeTransmission === transmission
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground border border-border/50"
                }`}
                aria-pressed={activeTransmission === transmission}
              >
                {transmission}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
