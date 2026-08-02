import { useEffect, useState } from 'react'
import { ArrowRight, Check, Mail, Phone } from 'lucide-react'
import { ContactForm } from './components/ContactForm'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MobileContactBar } from './components/MobileContactBar'
import { ProjectGallery } from './components/ProjectGallery'
import { SectionHeading } from './components/SectionHeading'
import { ServicesSection } from './components/ServicesSection'
import { SiteFooter } from './components/SiteFooter'
import { company, whatsappUrl } from './config/company'
import { differentials, processSteps } from './data/content'

function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reveal = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach(element => reveal.observe(element))

    const onScroll = () => {
      const available = document.documentElement.scrollHeight - innerHeight
      setProgress(available > 0 ? Math.min(scrollY / available, 1) : 0)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      reveal.disconnect()
      removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="page-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Header />
      <main id="conteudo">
        <Hero />

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
            </div>
            <div className="about-copy reveal">
              <SectionHeading number="02" eyebrow="Sobre a GAMAK" title="Critério técnico em cada decisão." />
              <p className="lead">A GAMAK desenvolve soluções em engenharia para obras, instalações e manutenções, conduzindo cada serviço com planejamento, conhecimento técnico e responsabilidade.</p>
              <p>Nossa atuação começa pela compreensão da necessidade e avança por etapas claras, da avaliação inicial à inspeção final.</p>
              <dl className="principles">
                <div><dt>01</dt><dd><strong>Planejamento</strong><span>Leitura do contexto antes da execução.</span></dd></div>
                <div><dt>02</dt><dd><strong>Responsabilidade</strong><span>Atenção técnica durante todo o serviço.</span></dd></div>
                <div><dt>03</dt><dd><strong>Clareza</strong><span>Comunicação objetiva em cada etapa.</span></dd></div>
              </dl>
            </div>
          </div>
        </section>

        <ServicesSection />
        <ProjectGallery />

        <section className="section process-section">
          <div className="container process-layout">
            <div className="process-intro">
              <SectionHeading number="05" eyebrow="Nosso processo" title="Clareza do primeiro contato à entrega." copy="Um fluxo simples, com decisões organizadas e acompanhamento em todas as etapas." />
              <a className="text-link dark-link" href="#contato">Apresentar uma necessidade <ArrowRight /></a>
            </div>
            <ol className="process-list">
              {processSteps.map(([number, title, description], index) => (
                <li className="process-step reveal" style={{ '--delay': `${index * 60}ms` } as React.CSSProperties} key={number}>
                  <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section differentials-section">
          <div className="container differentials-layout">
            <div className="differentials-copy">
              <SectionHeading number="06" eyebrow="Critérios de trabalho" title="Confiança construída no processo." />
              <p>Organização, diálogo e cuidado técnico são partes inseparáveis de uma entrega confiável.</p>
            </div>
            <div className="differentials-list">
              {differentials.map(({ title, Icon }, index) => (
                <div className="differential reveal" style={{ '--delay': `${index * 45}ms` } as React.CSSProperties} key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span><Icon /><strong>{title}</strong><Check />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-layout reveal">
            <span className="cta-index">Próxima etapa · avaliação</span>
            <div><h2>Uma solução segura começa com uma conversa clara.</h2><p>Apresente sua necessidade para a GAMAK e receba um atendimento direcionado ao contexto do serviço.</p></div>
            <div className="cta-actions"><a className="button button-light" href={whatsappUrl()} target="_blank" rel="noreferrer"><img className="whatsapp-logo-inline" src="/images/social/whatsapp-logo.png" alt="" width="180" height="180" /> Falar pelo WhatsApp</a><a className="button button-outline-light" href={`mailto:${company.email}`}><Mail /> Enviar e-mail</a></div>
          </div>
        </section>

        <section id="contato" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <SectionHeading number="07" eyebrow="Contato" title="Conte o que o seu projeto exige." copy="Envie as informações iniciais. O atendimento continuará pelo WhatsApp, sem simular um envio por servidor." />
              <div className="contact-links">
                <a href={whatsappUrl()} target="_blank" rel="noreferrer"><Phone /><span><small>Telefone e WhatsApp</small><strong>{company.phoneDisplay}</strong></span></a>
                <a href={`mailto:${company.email}`}><Mail /><span><small>E-mail</small><strong>{company.email}</strong></span></a>
              </div>
              <p className="contact-note">Atendimento para demandas residenciais, comerciais e empresariais.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a GAMAK pelo WhatsApp"><img src="/images/social/whatsapp-logo.png" alt="" width="180" height="180" /></a>
      <MobileContactBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: company.legalName, telephone: company.phoneDisplay, email: company.email }) }} />
    </>
  )
}

export default App
