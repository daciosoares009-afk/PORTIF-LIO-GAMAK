import { useEffect, useRef } from 'react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MobileContactBar } from './components/MobileContactBar'
import { ProjectGallery } from './components/ProjectGallery'
import { SectionHeading } from './components/SectionHeading'
import { ServicesSection } from './components/ServicesSection'
import { SiteFooter } from './components/SiteFooter'
import { company, whatsappUrl } from './config/company'

function App() {
  const progressRef = useRef<HTMLDivElement>(null)

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
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div ref={progressRef} className="page-progress" aria-hidden="true" />
      <Header />
      <main id="conteudo">
        <Hero />
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
              <SectionHeading number="03" eyebrow="Quem somos" title="Engenharia feita com responsabilidade e atenção aos detalhes." />
              <p className="lead">A GAMAK atua com soluções de engenharia civil para obras, instalações, manutenções e adequações em diferentes tipos de ambiente.</p>
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
              <SectionHeading number="05" eyebrow="Contato" title="Tem um serviço para realizar?" copy="Fale diretamente com a GAMAK e apresente sua necessidade." />
            </div>
            <div className="portfolio-contact-actions">
              <a className="button" href={whatsappUrl()} target="_blank" rel="noreferrer"><Phone aria-hidden="true" /> Falar pelo WhatsApp <ArrowUpRight aria-hidden="true" /></a>
              <a className="portfolio-email" href={`mailto:${company.email}`}><Mail aria-hidden="true" /> {company.email}</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a GAMAK pelo WhatsApp"><img src="/images/social/whatsapp-logo.png" alt="" width="179" height="148" /></a>
      <MobileContactBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: company.legalName,
        url: company.website,
        logo: `${company.website}/images/brand/gamak-logo-oficial.png`,
        image: `${company.website}/images/projects/optimized/projeto-esteira-rolante-03-1440.webp`,
        description: company.description,
        telephone: company.phoneDisplay,
        email: company.email,
        serviceType: ['Obras e reformas', 'Instalações elétricas', 'Instalações hidráulicas', 'Manutenção preventiva e corretiva', 'Adequações comerciais', 'Infraestrutura e equipamentos'],
      }) }} />
    </>
  )
}

export default App
