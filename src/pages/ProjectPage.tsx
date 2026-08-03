import { ChevronLeft, ChevronRight, ArrowLeft, ArrowUpRight, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { company, whatsappUrl } from '../config/company'
import { CATEGORY_LABELS, getProjectBySlug } from '../data/projects'
import { projectSrcSetFromPath } from '../utils/projectImages'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider'
import { PageMeta } from '../components/PageMeta'
import { PortfolioCta } from '../components/PortfolioCta'
import { ProjectImage } from '../components/ProjectImage'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const [activeImage, setActiveImage] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setActiveImage(0))
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    return () => cancelAnimationFrame(frame)
  }, [slug])

  useEffect(() => {
    const revealElements = [...document.querySelectorAll<HTMLElement>('.reveal')]
    if (revealElements.length === 0) return

    const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      revealElements.forEach(element => element.classList.add('visible'))
      return
    }

    const frame = requestAnimationFrame(() => {
      revealElements.forEach(element => element.classList.add('visible'))
    })

    return () => cancelAnimationFrame(frame)
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
        canonical={`${company.website}/projetos/${project.slug}`}
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
            <div className="project-detail-grid">
              {project.challenge && (
                <section className="project-detail-card" aria-labelledby="project-challenge">
                  <div className="project-detail-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18" />
                      <path d="M3 7h18" />
                      <path d="M7 3h10" />
                      <path d="M7 21h10" />
                    </svg>
                  </div>
                  <h2 id="project-challenge">Desafio</h2>
                  <p>{project.challenge}</p>
                </section>
              )}
              {project.services.length > 0 && (
                <section className="project-detail-card" aria-labelledby="project-services">
                  <div className="project-detail-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7h16" />
                      <path d="M7 3h10" />
                      <path d="M7 21h10" />
                      <path d="M6 11h12" />
                      <path d="M6 15h8" />
                    </svg>
                  </div>
                  <h2 id="project-services">Serviço executado</h2>
                  <ul className="project-services-list">
                    {project.services.map(service => <li key={service}>{service}</li>)}
                  </ul>
                </section>
              )}
              {project.solution && (
                <section className="project-detail-card" aria-labelledby="project-solution">
                  <div className="project-detail-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                  <h2 id="project-solution">Solução</h2>
                  <p>{project.solution}</p>
                </section>
              )}
              {project.result && (
                <section className="project-detail-card" aria-labelledby="project-result">
                  <div className="project-detail-card-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 13 4 4L19 7" />
                      <path d="M11 17h8" />
                    </svg>
                  </div>
                  <h2 id="project-result">Resultado</h2>
                  <p>{project.result}</p>
                </section>
              )}
            </div>
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
