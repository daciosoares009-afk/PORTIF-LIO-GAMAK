import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORY_LABELS, featuredProjects } from '../data/projects'
import { projectSrcSetFromPath } from '../utils/projectImages'
import { ProjectImage } from './ProjectImage'
import { SectionHeading } from './SectionHeading'

export function FeaturedProjects() {
  if (featuredProjects.length === 0) return null

  return (
    <section id="destaques" className="section featured-projects-section" aria-labelledby="featured-projects-title">
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="Destaques"
          title="Projetos em evidência."
          copy="Alguns dos trabalhos executados pela GAMAK, com registro do desafio, da solução e do resultado."
        />
        <div className="featured-projects-list">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`featured-project reveal${index % 2 === 1 ? ' featured-project--reverse' : ''}`}
              style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
            >
              <Link to={`/projetos/${project.slug}`} className="featured-project-visual" tabIndex={-1} aria-hidden="true">
                <ProjectImage
                  src={project.coverImage}
                  srcSet={projectSrcSetFromPath(project.coverImage, project.imageBase)}
                  sizes="(max-width: 780px) 100vw, 46vw"
                  alt={project.alt}
                  style={{ objectPosition: project.objectPosition }}
                  width={816}
                  height={612}
                />
              </Link>
              <div className="featured-project-copy">
                <span className="featured-project-category">{CATEGORY_LABELS[project.category]}</span>
                <h3 id={index === 0 ? 'featured-projects-title' : undefined}>{project.title}</h3>
                <p className="featured-project-lead">{project.description}</p>
                {project.challenge && (
                  <dl className="featured-project-details">
                    <div>
                      <dt>Desafio</dt>
                      <dd>{project.challenge}</dd>
                    </div>
                    {project.services.length > 0 && (
                      <div>
                        <dt>Serviço executado</dt>
                        <dd>{project.services.join(' · ')}</dd>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <dt>Solução</dt>
                        <dd>{project.solution}</dd>
                      </div>
                    )}
                    {project.result && (
                      <div>
                        <dt>Resultado</dt>
                        <dd>{project.result}</dd>
                      </div>
                    )}
                  </dl>
                )}
                <Link to={`/projetos/${project.slug}`} className="featured-project-link">
                  Ver projeto completo <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
