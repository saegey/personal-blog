
export const slugify = (str: string) => {
  if (!str) return 'notfound'
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
