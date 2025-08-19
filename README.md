# Personal Blog, Projects, Bike Race Journal (Gatsby + MDX)

This is a personal blog for race journals and ride analysis. It’s a modern Gatsby 5 + React 18 site with MDX content, custom data ingestion (GPX and stats JSON), and visualization components for routes, elevation, power curves, and race overviews.

## Highlights

- Gatsby 5, React 18, TypeScript, Theme UI
- MDX posts under `content/posts/**`
- Stats JSON linked to posts via frontmatter and Gatsby schema `@link`
- GPX/JSON parsing into custom node fields
- Visualization wrappers for easy MDX usage:
  - `RaceOverviewWrapper`
  - `VisualOverviewWrapperNew` (map + elevation slice/graph)
  - `PowerCurveGraphStatsWrapper` (power curve from stats JSON)

## Tech Stack

- Framework: Gatsby 5
- Language: TypeScript + React 18
- Styling: Theme UI
- Charts/Maps: Recharts, Mapbox GL
- Content: MDX
- Build/runtime: Node 20 LTS (see `.nvmrc`, `.tool-versions`)

## Content & Data

Posts live in `content/posts/<slug>/index.mdx` with images placed alongside. Example frontmatter:

```yaml
title: Gorge Gravel Grinder
date: 2023-04-23
publishedDate: 2023-07-29
headerImage: './my-header.jpg'
headerImageCaption: 'Photo credit…'
tags: [gravel, race journal]
type: Race Journal
subType: Gravel Race
teaser: Short summary teaser
currentFtp: 273
statsFile: 'stats_gorge_gravel'  # links to a File node in content/stats
location: Dufur, Oregon
stravaUrl: https://www.strava.com/activities/...
```

### Stats JSON

- A filesystem source ingests stats files (e.g., under `content/stats`).
- A custom parser attaches parsed JSON at `File.fields.data`.
- Schema customization links each MDX node to a `statsData: File` via `frontmatter.statsFile`.
- In GraphQL you can query:

```graphql
mdx {
  statsData {
    fields { data }
  }
}ååå
```
å
## MDX Shortcodes (Wrappers)

Wrappers hide data shaping so MDX stays clean.

- `RaceOverviewWrapper`
  - Props: `data={props.data.mdx.statsData.fields.data}`
  - Optional: `selectedFields=[...]`

- `VisualOverviewWrapperNew`
  - Props: `data`, `elevationToAdd`, optional `yMin`, `downsampleRate`, `axisLeftTickValues`, `axisXTickValues`
  - Shapes `SimplifiedElevations`, `SimplifiedDistances`, and `MergedData` into the map + elevation graph.

- `PowerCurveGraphStatsWrapper`
  - Props: `data`, `ftp`, optional `xTicks`, `xScale`, `yDomain`
  - Converts `PowerAnalysis` (object map) to `{x,y}` array and renders a Recharts power curve with an FTP reference line.

## Development

- Requirements: Node 20 LTS (see `.nvmrc`, `.tool-versions`)
- Environment: Mapbox token required for maps: `GATSBY_MAPBOX_TOKEN`
- Useful npm scripts (see `package.json`):
  - `start` → Gatsby develop
  - `develop` → `vercel dev` (optional local dev via Vercel)
  - `build` → Gatsby build
  - `serve` → Gatsby serve
  - `clean` → Gatsby clean

Notes:
- Images are constrained in GraphQL queries to reduce Sharp work (faster builds).
- Some components expect metric/imperial conversions and may reference units via context providers.

## Deployment

- Platform: Vercel
- Build command: `npm run build` (runs `gatsby build`)
- Output directory: `public`
- Node: 20 LTS (see `.nvmrc`/`.tool-versions`)

Local dev with Vercel:

```sh
vercel dev
```å

## Generating Stats JSON

Stats are generated via https://github.com/saegey/fit-analysis and stored in `content/stats/`.

Example:

```sh
./processFitFile --ftp 295 --fit ~/Downloads/Gran_Fondo_Leavenworth.fit > stats_gran_fondo_leavenworth.json
```

Frontmatter must reference the file name without the `.json` extension via `statsFile`. For the example above:

```yaml
statsFile: 'stats_gran_fondo_leavenworth'
```

## Project Structure (selected)

```
content/
  posts/                 # MDX posts
    <slug>/
      index.mdx
      *.jpg
src/
  components/
    posts/
      RaceStats/
        RaceOverviewWrapper.tsx
      PowerCurveGraph/
        PowerCurveGraph.tsx
        PowerCurveGraphStatsWrapper.tsx
      VisualOverviewWrapperNew.tsx
  templates/
    post.tsx             # MDX template & shortcodes
  pages/
    home.tsx             # Home listing
src/app/gatsby/
  createSchemaCustomization.ts
  parsers/               # JSON/GPX parsers
```

## Open Questions

To finalize this doc, a few quick confirmations would help:
- Contact/feedback mechanism (serverless function or form) to mention?

## Environment Variables

- `GATSBY_MAPBOX_TOKEN` (required for maps)

## License & Contributing

- License: MIT
- Forks welcome if you want to build something similar.

