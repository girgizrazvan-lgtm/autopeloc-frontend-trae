export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

export function getSessionId(): string {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem("booking_session_id")
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem("booking_session_id", sessionId)
  }
  return sessionId
}

export function clearSessionId(): void {
  if (typeof window === "undefined") return
  sessionStorage.removeItem("booking_session_id")
}
