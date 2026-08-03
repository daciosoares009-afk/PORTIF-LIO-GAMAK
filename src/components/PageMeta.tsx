import { useEffect } from 'react'

type PageMetaProps = {
  title: string
  description: string
  image?: string
}

export function PageMeta({ title, description, image }: PageMetaProps) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const setMeta = (selector: string, content: string, attr: 'content' | 'property' = 'content') => {
      const element = document.querySelector<HTMLMetaElement>(selector)
      if (element) element.setAttribute(attr, content)
    }

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title, 'content')
    setMeta('meta[property="og:description"]', description, 'content')
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    if (image) {
      setMeta('meta[property="og:image"]', image, 'content')
      setMeta('meta[name="twitter:image"]', image)
    }

    return () => {
      document.title = previousTitle
    }
  }, [title, description, image])

  return null
}
