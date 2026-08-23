/**
 * Upload a finished gallery export to R2 and write its local content manifest.
 * Full files are uploaded exactly as Pixelmator exported them; only thumbnails
 * are derived here.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'
import sharp from 'sharp'

import { publicUrlFor, uploadBuffer } from './lib/r2.mjs'

const args = process.argv.slice(2)
const valueFor = name => {
  const index = args.indexOf(name)
  return index === -1 ? undefined : args[index + 1]
}
const requireValue = name => {
  const value = valueFor(name)
  if (!value || value.startsWith('--')) throw new Error(`Missing ${name}.`)
  return value
}
const dryRun = args.includes('--dry-run')
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const thumbWidth = 720
const slug = requireValue('--slug')
const source = resolve(requireValue('--source'))
const title = requireValue('--title')
const theme = requireValue('--theme')
const date = requireValue('--date')
const location = requireValue('--location')
const description = valueFor('--description')

if (!existsSync(source)) throw new Error(`Source folder does not exist: ${source}`)
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('--date must be YYYY-MM-DD.')
const files = readdirSync(source).filter(file => !file.startsWith('.') && imageExtensions.has(extname(file).toLowerCase())).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
if (!files.length) throw new Error(`No supported images found in ${source}.`)
const keyStem = file => basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const contentType = file => extname(file).toLowerCase() === '.webp' ? 'image/webp' : extname(file).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg'

const main = async () => {
  console.log(`${dryRun ? 'Previewing' : 'Uploading'} ${files.length} photo(s) for ${slug}.`)
  const photos = []
  for (const [index, file] of files.entries()) {
    const original = readFileSync(join(source, file))
    const metadata = await sharp(original).metadata()
    if (!metadata.width || !metadata.height) throw new Error(`Could not read dimensions for ${file}.`)
    const id = keyStem(file) || `photo-${index + 1}`
    const fullKey = `galleries/${slug}/full/${id}${extname(file).toLowerCase()}`
    const thumbKey = `galleries/${slug}/thumbs/${id}.webp`
    const thumbnail = await sharp(original).rotate().resize({ width: thumbWidth, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer()
    if (dryRun) console.log(`  [${index + 1}/${files.length}] ${file} → ${fullKey} + thumbnail`)
    else {
      process.stdout.write(`  [${index + 1}/${files.length}] ${file} … `)
      await Promise.all([uploadBuffer(fullKey, original, contentType(file)), uploadBuffer(thumbKey, thumbnail, 'image/webp')])
      console.log('✓')
    }
    photos.push({ id, full: publicUrlFor(fullKey), thumbnail: publicUrlFor(thumbKey), width: metadata.width, height: metadata.height, alt: `${title}, photograph ${index + 1}` })
  }
  const manifest = { slug, title, theme, date, location, ...(description ? { description } : {}), cover: photos[0].thumbnail, photos }
  const manifestPath = join(process.cwd(), 'content', 'galleries', `${slug}.json`)
  if (dryRun) console.log(`Would write ${manifestPath}`)
  else {
    mkdirSync(join(process.cwd(), 'content', 'galleries'), { recursive: true })
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    console.log(`✓ Wrote ${manifestPath}`)
  }
}

main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exit(1) })
