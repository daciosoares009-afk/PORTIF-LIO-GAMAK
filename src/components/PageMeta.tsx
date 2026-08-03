import { useEffect } from 'react'

type PageMetaProps = {
  title: string
  description: string
  image?: string
  canonical?: string
}

export function PageMeta({ title, description, image, canonical }: PageMetaProps) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const setMeta = (selector: string, content: string, attr: 'content' | 'property' = 'content') => {
      const element = document.querySelector<HTMLMetaElement>(selector)
      if (element) element.setAttribute(attr, content)
    }

    const setLink = (rel: string, href: string) => {
      let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.append(element)
      }
      element.setAttribute('href', href)
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
    if (canonical) {
      setLink('canonical', canonical)
      setMeta('meta[property="og:url"]', canonical, 'content')
    }

    return () => {
      document.title = previousTitle
    }
  }, [title, description, image, canonical])

  return null
}
