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
          <span className="hero-kicker"><i /> Portfólio GAMAK</span>
          <h1 id="hero-title">Projetos executados <em>pela GAMAK.</em></h1>
          <p>Obras, reformas, manutenções, instalações elétricas e hidráulicas, pinturas, reparos e soluções técnicas conduzidas com responsabilidade.</p>
          <div className="hero-actions">
            <a className="button" href="#projetos">Ver portfólio <ArrowDown /></a>
            <a className="text-link" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar com a GAMAK <ArrowUpRight /></a>
          </div>
        </div>
        <aside className="hero-context" aria-label="Conteúdo do portfólio">
          <span className="hero-context-label">Neste portfólio</span>
          <div><strong>Obras</strong><strong>Reformas</strong><strong>Manutenções</strong><strong>Instalações</strong></div>
          <p>Registros reais de serviços executados pela empresa.</p>
        </aside>
      </div>
    </section>
  )
}
