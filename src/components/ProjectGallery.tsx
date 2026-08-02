import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function ProjectGallery() {
  const categories = ['Todos', ...new Set(projects.map(project => project.category))]
  const [filter, setFilter] = useState('Todos')
  const [selected, setSelected] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter)
  const isOpen = selected !== null

  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.classList.add('lightbox-open')
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
      previousFocus?.focus()
    }
  }, [isOpen, filtered.length])

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
          <div className="project-grid" key={filter}>
            {filtered.map((project, index) => <button type="button" className="project-card" aria-haspopup="dialog" key={project.id} onClick={() => setSelected(index)}>
              <img src={project.image} srcSet={project.srcSet} sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 980px) 50vw, 38vw" alt={project.alt} loading="lazy" decoding="async" style={{ objectPosition: project.objectPosition }} width="960" height="720" />
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="project-card-copy"><small>{project.category}</small><strong>{project.title}</strong></span>
              <span className="project-expand" aria-hidden="true"><Expand /></span>
            </button>)}
          </div>
        </>
      </div>
      {selected !== null && filtered[selected] && <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label={filtered[selected].title} onClick={() => setSelected(null)}>
        <button type="button" ref={closeButtonRef} className="lightbox-close" aria-label="Fechar" onClick={() => setSelected(null)}><X /></button>
        <button type="button" className="lightbox-prev" aria-label="Foto anterior" onClick={e => { e.stopPropagation(); setSelected((selected - 1 + filtered.length) % filtered.length) }}><ChevronLeft /></button>
        <figure onClick={e => e.stopPropagation()}><img src={filtered[selected].image} srcSet={filtered[selected].srcSet} sizes="(max-width: 700px) 100vw, 70vw" alt={filtered[selected].alt}/><figcaption><span className="lightbox-count">{String(selected + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span><small>{filtered[selected].category}</small><h3>{filtered[selected].title}</h3><p>{filtered[selected].description}</p></figcaption></figure>
        <button type="button" className="lightbox-next" aria-label="Próxima foto" onClick={e => { e.stopPropagation(); setSelected((selected + 1) % filtered.length) }}><ChevronRight /></button>
      </div>}
    </section>
  )
}
