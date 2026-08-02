import { useEffect, useState, type MouseEvent } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { Brand } from './Brand'
import { whatsappUrl } from '../config/company'

const links = [['inicio', 'Início'], ['empresa', 'Empresa'], ['servicos', 'Serviços'], ['projetos', 'Projetos'], ['contato', 'Contato']] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 32)
    onScroll(); addEventListener('scroll', onScroll, { passive: true })
    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id))
    }, { rootMargin: '-35% 0px -55%' })
    sections.forEach(section => observer.observe(section))
    return () => { removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('menu-open')
      removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('gamak-theme', next ? 'dark' : 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#00131F' : '#FFFDF8')
  }

  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!open) return
    event.preventDefault()
    setOpen(false)
    document.body.classList.remove('menu-open')
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
      history.replaceState(null, '', `#${id}`)
    })
  }

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <Brand />
        <nav id="main-navigation" className={open ? 'open' : ''} aria-label="Navegação principal">
          <span className="nav-caption">Navegação</span>
          {links.map(([id, label], index) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'page' : undefined} onClick={event => navigateFromMenu(event, id)}><small>{String(index + 1).padStart(2, '0')}</small>{label}</a>)}
          <a className="button nav-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">Solicitar avaliação</a>
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-button" onClick={toggleTheme} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} aria-pressed={dark}>{dark ? <Sun /> : <Moon />}</button>
          <button type="button" className="icon-button menu-button" onClick={() => setOpen(!open)} aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <button type="button" className="menu-backdrop" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
    </header>
  )
}
