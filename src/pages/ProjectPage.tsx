import { ChevronLeft, ChevronRight, ArrowLeft, ArrowUpRight, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { company, whatsappUrl } from '../config/company'
import { CATEGORY_LABELS, getProjectBySlug } from '../data/projects'
import { projectSrcSetFromPath } from '../utils/projectImages'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { PageMeta } from './PageMeta'
import { PortfolioCta } from './PortfolioCta'
import { ProjectImage } from './ProjectImage'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const [activeImage, setActiveImage] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveImage(0)
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [slug])

  if (!project) return <Navigate to="/#projetos" replace />

  const images = project.images.length > 0 ? project.images : [project.coverImage]
  const whatsappMessage = `Olá, GAMAK! Vi o projeto "${project.title}" no portfólio e gostaria de solicitar uma avaliação para um serviço semelhante.`

  const showPreviousImage = () => setActiveImage(current => (current - 1 + images.length) % images.length)
  const showNextImage = () => setActiveImage(current => (current + 1) % images.length)

  return (
    <>
      <PageMeta
        title={`${project.title} | GAMAK Soluções em Engenharia`}
        description={project.description}
        image={`${company.website}${project.coverImage}`}
      />
      <article className="section project-detail">
        <div className="container">
          <nav className="project-breadcrumb" aria-label="Navegação do projeto">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/#projetos">Portfólio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <header className="project-detail-header reveal">
            <span className="eyebrow">{CATEGORY_LABELS[project.category]}</span>
            <h1>{project.title}</h1>
            <p className="lead">{project.description}</p>
            {project.location && <p className="project-detail-location">{project.location}</p>}
          </header>

          <div className="project-detail-gallery reveal" ref={galleryRef}>
            <figure className="project-detail-main-image">
              <ProjectImage
                src={images[activeImage]}
                srcSet={project.imageBase ? projectSrcSetFromPath(images[activeImage], project.imageBase) : undefined}
                sizes="(max-width: 780px) 100vw, min(1120px, 90vw)"
                alt={`${project.alt} — imagem ${activeImage + 1} de ${images.length}`}
                style={{ objectPosition: project.objectPosition }}
                width={1200}
                height={800}
                priority
              />
              {images.length > 1 && (
                <>
                  <button type="button" className="project-gallery-prev" aria-label="Imagem anterior" onClick={showPreviousImage}>
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button type="button" className="project-gallery-next" aria-label="Próxima imagem" onClick={showNextImage}>
                    <ChevronRight aria-hidden="true" />
                  </button>
                  <span className="project-gallery-count" aria-live="polite">
                    {String(activeImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </span>
                </>
              )}
            </figure>
            {images.length > 1 && (
              <div className="project-detail-thumbs" role="tablist" aria-label="Galeria de imagens">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    role="tab"
                    aria-selected={activeImage === index}
                    aria-label={`Ver imagem ${index + 1}`}
                    className={activeImage === index ? 'active' : ''}
                    onClick={() => setActiveImage(index)}
                  >
                    <ProjectImage src={image} alt="" width={120} height={90} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {project.beforeImage && project.afterImage && (
            <section className="project-before-after reveal" aria-labelledby="before-after-title">
              <h2 id="before-after-title">Antes e depois</h2>
              <BeforeAfterSlider
                before={project.beforeImage}
                after={project.afterImage}
                altBefore={`${project.title} — antes`}
                altAfter={`${project.title} — depois`}
              />
            </section>
          )}

          <div className="project-detail-content reveal">
            {project.challenge && (
              <section aria-labelledby="project-challenge">
                <h2 id="project-challenge">Problema encontrado</h2>
                <p>{project.challenge}</p>
              </section>
            )}
            {project.solution && (
              <section aria-labelledby="project-solution">
                <h2 id="project-solution">Solução executada</h2>
                <p>{project.solution}</p>
              </section>
            )}
            {project.services.length > 0 && (
              <section aria-labelledby="project-services">
                <h2 id="project-services">Serviços realizados</h2>
                <ul className="project-services-list">
                  {project.services.map(service => <li key={service}>{service}</li>)}
                </ul>
              </section>
            )}
            {project.result && (
              <section aria-labelledby="project-result">
                <h2 id="project-result">Resultado final</h2>
                <p>{project.result}</p>
              </section>
            )}
          </div>

          <div className="project-detail-actions reveal">
            <a className="button" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">
              <Phone aria-hidden="true" /> Solicitar orçamento semelhante <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className="dark-link" to="/#projetos">
              <ArrowLeft aria-hidden="true" /> Voltar ao portfólio
            </Link>
          </div>
        </div>
      </article>
      <PortfolioCta projectTitle={project.title} />
    </>
  )
}
