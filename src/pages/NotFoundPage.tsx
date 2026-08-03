import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { company, whatsappUrl } from '../config/company'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Página não encontrada | GAMAK Soluções em Engenharia"
        description="A página solicitada não foi encontrada. Volte ao portfólio ou fale com a GAMAK pelo WhatsApp."
        canonical={company.website}
      />
      <section className="section not-found-section" aria-labelledby="not-found-title">
        <div className="container not-found-layout">
          <div>
            <p className="eyebrow"><b>404</b> Página não encontrada</p>
            <h1 id="not-found-title">A página que você procura não está disponível.</h1>
            <p className="lead">Retorne ao portfólio ou fale diretamente com a equipe para encontrar a solução certa para sua obra, reforma ou manutenção.</p>
          </div>
          <div className="not-found-actions">
            <Link className="button" to="/#projetos">Ver portfólio</Link>
            <a className="text-link" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar com a GAMAK <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  )
}
