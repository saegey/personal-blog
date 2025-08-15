import { ImageProps, ThemeUIStyleObject, Image } from 'theme-ui'
import {
  IGatsbyImageData,
  GatsbyImage,
  GatsbyImageProps,
} from 'gatsby-plugin-image'
import { FunctionComponent } from 'react'

interface AliasImageProps extends ImageProps {
  image: IGatsbyImageData | undefined
  objectFit?: string
  layout?: string
  alt?: string
  as: FunctionComponent<GatsbyImageProps>
  variant?: string
}

const ImageAlias = Image as any as (props: AliasImageProps) => JSX.Element

interface CustomImageProps {
  image: IGatsbyImageData | undefined
  objectFit?: string
  alt: string
  variant?: string | undefined
  theme?: ThemeUIStyleObject | undefined
  sx?: ThemeUIStyleObject | undefined
  layout?: string | undefined
}

const CustomImage = ({
  image,
  publicUrl,
  objectFit,
  alt,
  variant,
  theme,
  layout,
  sx = {},
}: CustomImageProps) => {
  if (publicUrl) {
    return (
      <Image
        src={publicUrl}
        alt={alt}
        sx={sx}
        className={variant}
      />
    )
  }
  return (
    <ImageAlias
      image={image}
      objectFit={objectFit}
      layout={layout}
      alt={alt}
      as={GatsbyImage}
      variant={variant}
      sx={theme}
    />
  )
}

export default CustomImage
