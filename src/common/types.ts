import { IGatsbyImageData, GatsbyImageProps } from 'gatsby-plugin-image'
import { LinkProps, ImageProps, BoxProps } from 'theme-ui'
import { GatsbyLinkProps } from 'gatsby'
import { FunctionComponent } from 'react'

// interface Image {
//   image: IGatsbyImageData | null
// }

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
  data: {
    id: string
    data: Coordinate[]
  }
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
  segments?: Array<Segment>
  isMaximized: boolean
  title: string
}

export interface LineGraphProps {
  data: [
    {
      id: string
      data: Coordinate[]
    }
  ]
  unit: string
  yScaleMin: number
  yScaleMax: number
  areaBaselineValue: number
  axisBottomTickValues: number[]
  axisLeftTickValues: number[]
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
  enableArea: boolean
  lineWidth: number
  colors?: string[]
  markers?: any
  xScaleType?: 'linear' | 'log' | 'symlog' | 'point'
}

export interface RaceImageType {
  image: IGatsbyImageData
  caption: string
  altText: string
}
type CustomGatsbyLinkProps = Omit<GatsbyLinkProps<{}>, 'ref'>

export interface MyLinkProps extends LinkProps, CustomGatsbyLinkProps {
  // as: typeof CustomGatsbyLinkProps // this is now required
}
export interface MyImageProps extends ImageProps {
  image: IGatsbyImageData | undefined
  objectFit?: string
  layout?: string
  alt?: string
  as: FunctionComponent<GatsbyImageProps>
  variant?: string
}

export interface BoxSvgType extends BoxProps {
  viewBox: string
  height?: string
  width?: string
}

export interface NestedRaceImageType extends RaceImageType {
  children: JSX.Element
}

export interface PostCardProps {
  post: PostNode
  title: string
  image: IGatsbyImageData | undefined
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
