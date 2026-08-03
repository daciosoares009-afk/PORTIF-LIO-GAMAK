import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function ProjectGallery() {
  const categories = ['Todos', ...new Set(projects.map(project => project.category))]
  const [filter, setFilter] = useState('Todos')
  const [selected, setSelected] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const pointerStartRef = useRef<number | null>(null)
  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter)
  const isOpen = selected !== null

  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    const appRoot = document.getElementById('root')
    document.body.classList.add('lightbox-open')
    appRoot?.setAttribute('inert', '')
    closeButtonRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowRight') setSelected(current => current === null ? null : (current + 1) % filtered.length)
      if (event.key === 'ArrowLeft') setSelected(current => current === null ? null : (current - 1 + filtered.length) % filtered.length)
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('keydown', onKey)
      document.body.classList.remove('lightbox-open')
      appRoot?.removeAttribute('inert')
      previousFocus?.focus()
    }
  }, [isOpen, filtered.length])

  const showPrevious = () => setSelected(current => current === null ? null : (current - 1 + filtered.length) % filtered.length)
  const showNext = () => setSelected(current => current === null ? null : (current + 1) % filtered.length)

  const lightbox = selected !== null && filtered[selected] ? createPortal(
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-description"
      onClick={() => setSelected(null)}
      onPointerDown={event => { pointerStartRef.current = event.clientX }}
      onPointerUp={event => {
        if (pointerStartRef.current === null || filtered.length < 2) return
        const distance = event.clientX - pointerStartRef.current
        pointerStartRef.current = null
        if (Math.abs(distance) < 55) return
        if (distance > 0) showPrevious()
        else showNext()
      }}
    >
      <button type="button" ref={closeButtonRef} className="lightbox-close" aria-label="Fechar visualização do projeto" onClick={() => setSelected(null)}><X aria-hidden="true" /></button>
      {filtered.length > 1 && <button type="button" className="lightbox-prev" aria-label="Projeto anterior" onClick={event => { event.stopPropagation(); showPrevious() }}><ChevronLeft aria-hidden="true" /></button>}
      <figure onClick={event => event.stopPropagation()}>
        <img src={filtered[selected].image} srcSet={filtered[selected].srcSet} sizes="(max-width: 700px) 100vw, 70vw" alt={filtered[selected].alt} width="960" height="1280" />
        <figcaption>
          <span className="lightbox-count">{String(selected + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span>
          <small>{filtered[selected].category}</small>
          <h3 id="lightbox-title">{filtered[selected].title}</h3>
          <p id="lightbox-description">{filtered[selected].description}</p>
        </figcaption>
      </figure>
      {filtered.length > 1 && <button type="button" className="lightbox-next" aria-label="Próximo projeto" onClick={event => { event.stopPropagation(); showNext() }}><ChevronRight aria-hidden="true" /></button>}
    </div>,
    document.body,
  ) : null

  return (
    <section id="projetos" className="section projects-section">
      <div className="container">
        <div className="projects-intro">
          <SectionHeading number="04" eyebrow="Portfólio técnico" title="Execução real. Resultado visível." copy="Registros de obras, instalações e manutenções executadas pela GAMAK em diferentes contextos de atuação." />
          <div className="projects-aside"><strong>{String(projects.length).padStart(2, '0')}</strong><span>registros técnicos<br />no acervo</span></div>
        </div>
        <>
          <div className="project-toolbar">
            <div className="filters" role="group" aria-label="Filtrar projetos">
              {categories.map(category => <button type="button" aria-pressed={filter === category} className={filter === category ? 'active' : ''} onClick={() => { setFilter(category); setSelected(null) }} key={category}>{category}</button>)}
            </div>
            <span className="project-result" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'projeto' : 'projetos'}</span>
          </div>
          {filtered.length > 0 ? <div className="project-grid" key={filter}>
            {filtered.map((project, index) => <button type="button" className={`project-card project-card--${project.size ?? 'standard'}`} aria-haspopup="dialog" key={project.id} onClick={() => setSelected(index)}>
              <span className="sr-only">Abrir projeto: </span>
              <img src={project.image} srcSet={project.srcSet} sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 980px) 50vw, 38vw" alt="" loading="lazy" decoding="async" style={{ objectPosition: project.objectPosition }} width="960" height="720" />
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="project-card-copy"><small>{project.category}</small><strong>{project.title}</strong></span>
              <span className="project-expand" aria-hidden="true"><Expand /></span>
            </button>)}
          </div> : <p className="project-empty" role="status">Nenhum projeto está disponível neste filtro.</p>}
        </>
      </div>
      {lightbox}
    </section>
  )
}
