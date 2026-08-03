const FALLBACK = '/images/projects/optimized/projeto-esteira-rolante-03-1440.webp'

export function projectCoverSrc(project: { coverImage: string; imageBase?: string }): string {
  return project.coverImage || FALLBACK
}

export function projectSrcSetFromBase(imageBase: string): string {
  return [480, 960, 1440]
    .map(width => `/images/projects/optimized/${imageBase}-${width}.webp ${width}w`)
    .join(', ')
}

export function projectSrcSetFromPath(coverImage: string, imageBase?: string): string {
  if (imageBase) return projectSrcSetFromBase(imageBase)
  return `${coverImage} 1440w`
}

export { FALLBACK as PROJECT_IMAGE_FALLBACK }
