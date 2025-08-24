export type PvrEpisode = {
  title: string
  url: string
  date?: string // ISO date string, optional
}

// Edit this list to feature PVR episodes that aren't blog posts.
export const pvrEpisodes: PvrEpisode[] = [
  // Example:
  { title: 'Public Vinyl Radio — Jazz Con Sazón', url: 'https://youtu.be/dww-6cKnfYs' },
  { title: 'Public Vinyl Radio — TROPICAL SUNSETS', url: 'https://youtu.be/6hZ3E1-K9jw' }
]
