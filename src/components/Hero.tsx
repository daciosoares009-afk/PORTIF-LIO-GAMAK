import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { whatsappUrl } from '../config/company'

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-blueprint" aria-hidden="true"><i /><i /><i /></div>
      <div className="container hero-layout">
        <div className="hero-copy">
          <span className="hero-kicker"><i /> GAMAK · Soluções em Engenharia</span>
          <h1 id="hero-title">Engenharia aplicada <em>com precisão.</em></h1>
          <p>Soluções completas para obras, instalações e manutenções, do planejamento à entrega.</p>
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
