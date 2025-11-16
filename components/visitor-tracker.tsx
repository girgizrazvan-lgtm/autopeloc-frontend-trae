"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Generate or retrieve a unique session ID
function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return ""

  const storageKey = "visitor_session_id"
  let sessionId = sessionStorage.getItem(storageKey)

  if (!sessionId) {
    // Generate a unique session ID
    sessionId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    sessionStorage.setItem(storageKey, sessionId)
  }

  return sessionId
}

export function VisitorTracker() {
  const pathname = usePathname()
  const sessionIdRef = useRef<string>("")
  const lastPageRef = useRef<string>("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Skip tracking for admin pages
    if (pathname?.startsWith("/admin")) {
      return
    }

    // Initialize session ID
    sessionIdRef.current = getOrCreateSessionId()

    // Track page view immediately
    const trackPageView = async () => {
      const currentPage = pathname || "/"
      const pageTitle = typeof document !== "undefined" ? document.title : ""
      const referrer = typeof document !== "undefined" ? document.referrer : ""

      // Only track if page changed
      if (currentPage !== lastPageRef.current) {
        lastPageRef.current = currentPage

        try {
          await fetch("/api/track-visitor", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId: sessionIdRef.current,
              currentPage,
              pageTitle,
              referrer,
            }),
          })
        } catch (error) {
          // Silently fail - tracking should not break the user experience
          console.debug("Visitor tracking error:", error)
        }
      }
    }

    // Track initial page view
    trackPageView()

    // Set up heartbeat to update last_activity every 15 seconds
    intervalRef.current = setInterval(() => {
      trackPageView()
    }, 15000) // 15 seconds

    // Track page visibility changes (when user switches tabs)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackPageView()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}

