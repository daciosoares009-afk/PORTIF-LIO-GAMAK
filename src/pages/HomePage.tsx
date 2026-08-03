import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { Hero } from '../components/Hero'
import { ProjectGallery } from '../components/ProjectGallery'
import { SectionHeading } from '../components/SectionHeading'
import { ServicesSection } from '../components/ServicesSection'
import { company, whatsappUrl } from '../config/company'

export function HomePage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }, [location.hash])

  useEffect(() => {
    const revealElements = [...document.querySelectorAll<HTMLElement>('.reveal')]
    let reveal: IntersectionObserver | undefined

    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('visible')
          reveal?.unobserve(entry.target)
        })
      }, { threshold: 0.12, rootMargin: '0px 0px -24px' })
      revealElements.forEach(element => {
        if (element.getBoundingClientRect().top < innerHeight) element.classList.add('visible')
        else reveal?.observe(element)
      })
    } else {
      revealElements.forEach(element => element.classList.add('visible'))
    }

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - innerHeight
        const progress = available > 0 ? Math.min(scrollY / available, 1) : 0
        progressRef.current?.style.setProperty('--page-progress', String(progress))
        frame = 0
      })
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      reveal?.disconnect()
      cancelAnimationFrame(frame)
      removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <div ref={progressRef} className="page-progress" aria-hidden="true" />
      <Hero />
      <FeaturedProjects />
      <ProjectGallery />

      <section id="empresa" className="section about-section">
        <div className="container about-grid">
          <div className="about-visual reveal">
            <img
              className="brand-artwork"
              src="/images/brand/gamak-painel-institucional-816.webp"
              srcSet="/images/brand/gamak-painel-institucional-480.webp 480w, /images/brand/gamak-painel-institucional-816.webp 816w"
              sizes="(max-width: 700px) calc(100vw - 28px), 46vw"
              alt="Painel institucional da GAMAK Soluções em Engenharia com símbolo de edifício e inspeção"
              width="816"
              height="1145"
              loading="lazy"
              decoding="async"
            />
            <div className="about-visual-caption">
              <span>GAMAK · Soluções em Engenharia</span>
              <p>Compromisso com a excelência e inovação para construir o futuro.</p>
            </div>
          </div>
          <div className="about-copy reveal">
            <SectionHeading number="04" eyebrow="Quem somos" title="Engenharia feita com responsabilidade e atenção aos detalhes." />
            <p className="lead">A GAMAK atua com soluções de engenharia civil para obras, reformas, instalações, manutenções e adequações em diferentes tipos de ambiente.</p>
            <p>Cada trabalho começa pela compreensão da necessidade e segue com planejamento, conhecimento técnico e acompanhamento das etapas. Nosso objetivo é entregar soluções coerentes com o espaço, o uso e a realidade de cada serviço.</p>
            <div className="about-promise" aria-label="Compromissos da GAMAK">
              <span>Entregamos confiança.</span>
              <span>Entregamos qualidade.</span>
              <span>Entregamos soluções.</span>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      <section id="contato" className="section portfolio-contact">
        <div className="container portfolio-contact-layout reveal">
          <div>
            <SectionHeading number="06" eyebrow="Contato" title="Tem um serviço para realizar?" copy="Fale diretamente com a GAMAK e apresente sua necessidade." />
          </div>
          <div className="portfolio-contact-actions">
            <a className="button" href={whatsappUrl()} target="_blank" rel="noreferrer"><Phone aria-hidden="true" /> Falar pelo WhatsApp <ArrowUpRight aria-hidden="true" /></a>
            <a className="portfolio-email" href={`mailto:${company.email}`}><Mail aria-hidden="true" /> {company.email}</a>
          </div>
        </div>
      </section>
    </>
  )
}
