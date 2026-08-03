import { useState } from 'react'
import { FILTER_OPTIONS, matchesFilter, projects, type FilterId } from '../data/projects'
import { PortfolioCta } from './PortfolioCta'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function ProjectGallery() {
  const [filter, setFilter] = useState<FilterId>('todos')
  const filtered = projects.filter(project => matchesFilter(project, filter))

  return (
    <>
      <section id="projetos" className="section projects-section">
        <div className="container">
          <div className="projects-intro">
            <SectionHeading
              number="03"
              eyebrow="Portfólio"
              title="Projetos realizados."
              copy="Uma seleção de obras, reformas, instalações e manutenções executadas pela GAMAK."
            />
            <div className="projects-aside">
              <strong>{String(projects.length).padStart(2, '0')}</strong>
              <span>registros técnicos<br />no acervo</span>
            </div>
          </div>
          <div className="project-toolbar">
            <div className="filters" role="group" aria-label="Filtrar projetos">
              {FILTER_OPTIONS.map(option => (
                <button
                  type="button"
                  key={option.id}
                  aria-pressed={filter === option.id}
                  className={filter === option.id ? 'active' : ''}
                  onClick={() => setFilter(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <span className="project-result" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'projeto' : 'projetos'}
            </span>
          </div>
          {filtered.length > 0 ? (
            <div className="project-grid" key={filter}>
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <p className="project-empty" role="status">Nenhum projeto está disponível neste filtro.</p>
          )}
        </div>
      </section>
      <PortfolioCta />
    </>
  )
}
