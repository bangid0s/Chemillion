const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

/** Max 5 submissions per IP per hour. In memory, which suits the single-VPS deployment in the PRD. */
export const allowSubmission = (ip: string) => {
  const now = Date.now()
  // Keep memory bounded: drop IPs whose hits have all expired.
  if (hits.size > 10_000) for (const [key, times] of hits) if (now - times[times.length - 1] >= WINDOW_MS) hits.delete(key)
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return false
  }
  recent.push(now)
  hits.set(ip, recent)
  return true
}
