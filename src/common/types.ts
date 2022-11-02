import { IGatsbyImageData, ImageDataLike, GatsbyImageProps } from "gatsby-plugin-image"
import { LinkProps, ImageProps, BoxProps} from "theme-ui"
import { GatsbyLinkProps } from 'gatsby';
import { FunctionComponent } from 'react';

interface Image {
  image: IGatsbyImageData | null
}

export interface Coordinate {
  x: number,
  y: number
}

export interface GraphProps {
  data: Coordinate[]
  unit: {
		unitOfMeasure: string,
		toggleUnit: () => void
	}
}

export interface RaceImageType {
  image: IGatsbyImageData,
  caption: string
  altText: string
}
type CustomGatsbyLinkProps = Omit<GatsbyLinkProps<{}>, 'ref'>

export interface MyLinkProps extends LinkProps, CustomGatsbyLinkProps {
  // as: typeof CustomGatsbyLinkProps // this is now required
}
export interface MyImageProps extends ImageProps  {
  image: IGatsbyImageData
  objectFit?: string
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
  post: PostNode | null
  title: string | null
  image: IGatsbyImageData | undefined
}

export interface PostNode {
  frontmatter: {
    title: string,
    headerImage: ImageDataLike | null,
    date: string
    location: string
    type: string
  },
  fields: {
    slug: string
  }
}

export interface IndexDataProps {
  site: {
    siteMetadata: {
      title: string
    }
  },
  allMdx: {
    nodes: PostNode[]
  }
}
