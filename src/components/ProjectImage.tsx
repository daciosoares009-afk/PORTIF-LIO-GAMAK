import { useState } from 'react'
import { PROJECT_IMAGE_FALLBACK } from '../utils/projectImages'

type ProjectImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  srcSet?: string
  sizes?: string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}

export function ProjectImage({
  src,
  alt,
  width = 960,
  height = 720,
  srcSet,
  sizes,
  priority = false,
  className,
  style,
}: ProjectImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <img
      className={className}
      src={currentSrc}
      srcSet={currentSrc === src ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={style}
      onError={() => {
        if (currentSrc !== PROJECT_IMAGE_FALLBACK) setCurrentSrc(PROJECT_IMAGE_FALLBACK)
      }}
    />
  )
}
