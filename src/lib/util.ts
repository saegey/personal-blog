export const slugify = (str: string) => {
  if (!str) return 'notfound'
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Format seconds into HH:MM:SS
export const formatHMS = (totalSeconds: number) => {
  const sec = Math.max(0, Math.floor(totalSeconds || 0))
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export const toFeet = (meters: number) => meters * 3.280839895
export const toMiles = (km: number) => km * 0.621371
