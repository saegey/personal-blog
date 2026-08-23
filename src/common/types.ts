import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface Coordinate {
  x: number
  y: number
}

export interface Segment {
  beginningTime: number
  segmentDistance: number
  segmentDuration: number
  segmentDurationStopped: number
}

export interface GraphProps {
  data: Coordinate[]
  unit?: string
  startTime?: number
  endTime?: number
  downsampleRate?: number
  areaBaselineValue?: number
  axisLeftTickValues?: number[]
  yScaleMax?: number
  axisBottomTickValues?: number[]
  curve?:
    | 'linear'
    | 'natural'
    | 'basis'
    | 'cardinal'
    | 'catmullRom'
    | 'monotoneX'
    | 'monotoneY'
    | 'step'
    | 'stepAfter'
    | 'stepBefore'
    | undefined
  lineWidth?: number
  colors?: string[]
  isMaximized: boolean
  title: string
}

export interface PostNode {
  frontmatter: {
    title: string | null
    headerImage: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      } | null
    } | null
    date: string | null
    location: string | null
    type: string | null
    tags: ReadonlyArray<string>
  } | null
  fields: {
    slug: string | null
  } | null
}

export interface IndexDataProps {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMdx: {
    nodes: PostNode[]
  }
}
