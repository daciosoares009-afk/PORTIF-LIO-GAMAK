import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { whatsappUrl } from '../config/company'

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <picture className="hero-media" aria-hidden="true">
        <source
          srcSet="/images/projects/optimized/projeto-esteira-rolante-03-480.webp 480w, /images/projects/optimized/projeto-esteira-rolante-03-960.webp 960w, /images/projects/optimized/projeto-esteira-rolante-03-1440.webp 1440w"
          sizes="(max-width: 780px) 100vw, 48vw"
          type="image/webp"
        />
        <img
          src="/images/projects/optimized/projeto-esteira-rolante-03-1440.webp"
          alt=""
          width="1080"
          height="1440"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="hero-blueprint" aria-hidden="true"><i /><i /><i /></div>
      <div className="container hero-layout">
        <div className="hero-copy">
          <span className="hero-kicker"><i /> GAMAK · Soluções em Engenharia</span>
          <h1 id="hero-title">Obras e instalações <em>com precisão.</em></h1>
          <p>Execução, manutenção e adequação de ambientes residenciais, comerciais e empresariais, do planejamento à entrega.</p>
          <div className="hero-actions">
            <a className="button" href={whatsappUrl()} target="_blank" rel="noreferrer">Solicitar uma avaliação <ArrowUpRight /></a>
            <a className="text-link" href="#projetos">Conhecer projetos <ArrowDown /></a>
          </div>
        </div>
        <aside className="hero-context" aria-label="Áreas de atuação">
          <span className="hero-context-label">Atuação técnica</span>
          <div><strong>Residencial</strong><strong>Comercial</strong><strong>Empresarial</strong></div>
          <p>Planejamento, execução e acompanhamento em cada etapa.</p>
        </aside>
      </div>
      <div className="container hero-footnote">
        <span>Obras</span><i /> <span>Instalações</span><i /> <span>Manutenções</span>
        <b>01 — Engenharia com método</b>
      </div>
    </section>
  )
}
