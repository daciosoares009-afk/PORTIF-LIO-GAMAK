import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { Brand } from './Brand'
import { whatsappUrl } from '../config/company'

const links = [['inicio', 'Início'], ['quem-somos', 'Quem somos'], ['atuacao', 'Atuação'], ['projetos', 'Portfólio'], ['contato', 'Contato']] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 32)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })

    if (!isHome) {
      return () => removeEventListener('scroll', onScroll)
    }

    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id))
    }, { rootMargin: '-35% 0px -55%' })
    sections.forEach(section => observer.observe(section))
    return () => {
      removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [isHome, location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return

    const nav = navRef.current
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    if (main instanceof HTMLElement) main.setAttribute('inert', '')
    if (footer instanceof HTMLElement) footer.setAttribute('inert', '')
    const firstLink = nav?.querySelector<HTMLAnchorElement>('a')
    requestAnimationFrame(() => firstLink?.focus())

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !nav) return
      const focusable = [menuButtonRef.current, ...nav.querySelectorAll<HTMLElement>('a, button')].filter(Boolean) as HTMLElement[]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }

    addEventListener('keydown', closeOnEscape)
    addEventListener('keydown', trapFocus)
    return () => {
      document.body.classList.remove('menu-open')
      if (main instanceof HTMLElement) main.removeAttribute('inert')
      if (footer instanceof HTMLElement) footer.removeAttribute('inert')
      removeEventListener('keydown', closeOnEscape)
      removeEventListener('keydown', trapFocus)
    }
  }, [open])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('gamak-theme', next ? 'dark' : 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#00131F' : '#FFFDF8')
  }

  const goToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setOpen(false)
    document.body.classList.remove('menu-open')

    const scrollToSection = () => {
      document.getElementById(id)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    }

    if (isHome) {
      requestAnimationFrame(scrollToSection)
      history.replaceState(null, '', `#${id}`)
      return
    }

    navigate(`/#${id}`)
  }

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <Brand />
        <nav ref={navRef} id="main-navigation" className={open ? 'open' : ''} aria-label="Navegação principal">
          <span className="nav-caption">Navegação</span>
          {links.map(([id, label], index) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              className={isHome && active === id ? 'active' : ''}
              aria-current={isHome && active === id ? 'page' : undefined}
              onClick={event => goToSection(event, id)}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>
              {label}
            </a>
          ))}
          <a className="button nav-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-button" onClick={toggleTheme} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} aria-pressed={dark}>{dark ? <Sun /> : <Moon />}</button>
          <button ref={menuButtonRef} type="button" className="icon-button menu-button" onClick={() => setOpen(!open)} aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <button type="button" className="menu-backdrop" aria-label="Fechar menu ao tocar fora" onClick={() => setOpen(false)} />}
    </header>
  )
}
