import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import type { CSSProperties } from 'react'

type StyleLike = Record<string, unknown> | undefined

const value = (input: unknown) => Array.isArray(input) ? input[input.length - 1] : input
const stylesFrom = (theme?: StyleLike): CSSProperties => {
  if (!theme) return {}
  return {
    width: value(theme.width) as CSSProperties['width'],
    height: value(theme.height) as CSSProperties['height'],
    maxWidth: value(theme.maxWidth) as CSSProperties['maxWidth'],
    maxHeight: value(theme.maxHeight) as CSSProperties['maxHeight'],
    borderRadius: value(theme.borderRadius) as CSSProperties['borderRadius'],
    filter: value(theme.filter) as CSSProperties['filter'],
    objectFit: value(theme.objectFit) as CSSProperties['objectFit'],
    WebkitMaskImage: value(theme.WebkitMaskImage) as CSSProperties['WebkitMaskImage'],
  }
}

interface CustomImageProps {
  image?: IGatsbyImageData
  objectFit?: CSSProperties['objectFit']
  alt?: string
  variant?: string
  theme?: StyleLike
  sx?: StyleLike
  layout?: string
  publicUrl?: string
  className?: string
}

const CustomImage = ({ image, publicUrl, objectFit, alt = '', variant, theme, sx, className }: CustomImageProps) => {
  const style = { ...stylesFrom(theme), ...stylesFrom(sx), objectFit }
  const classes = `${className ?? ''} ${variant === 'fullScreen' ? 'max-h-[90vh] max-w-[90vw]' : ''}`.trim()

  if (publicUrl) return <img src={publicUrl} alt={alt} className={classes} style={style} />
  if (!image) return null
  return <GatsbyImage image={image} alt={alt} className={classes} style={style} objectFit={objectFit} />
}

export default CustomImage
