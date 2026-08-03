import { Link } from 'react-router-dom'
import { ArrowUpRight, Phone } from 'lucide-react'
import { whatsappUrl } from '../config/company'

type PortfolioCtaProps = {
  projectTitle?: string
}

export function PortfolioCta({ projectTitle }: PortfolioCtaProps) {
  const message = projectTitle
    ? `Olá, GAMAK! Vi o projeto "${projectTitle}" no portfólio e gostaria de solicitar uma avaliação para um serviço semelhante.`
    : 'Olá, GAMAK! Vi o portfólio no site e gostaria de solicitar uma avaliação para minha obra, reforma ou manutenção.'

  return (
    <section className="cta-section portfolio-cta" aria-labelledby="portfolio-cta-title">
      <div className="container cta-layout">
        <span className="cta-index">Contato</span>
        <div>
          <h2 id="portfolio-cta-title">Precisa de uma solução semelhante?</h2>
          <p>Entre em contato com a GAMAK e solicite uma avaliação para sua obra, reforma ou manutenção.</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" to="/#contato">Solicitar orçamento <ArrowUpRight aria-hidden="true" /></Link>
          <a className="button button-outline-light" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
            <Phone aria-hidden="true" /> Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
