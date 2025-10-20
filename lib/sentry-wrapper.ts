export function guard<T extends (...args: any[]) => Promise<any>>(fn: T, context?: string): T {
  return (async (...args: any[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error(`[Sentry] Error in ${context || fn.name}:`, error)

      // In production, this would send to Sentry
      // Sentry.captureException(error, { tags: { context } })

      throw error
    }
  }) as T
}
