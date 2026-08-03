import { ArrowUp, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, whatsappUrl } from '../config/company'
import { Brand } from './Brand'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container portfolio-footer-main">
        <div className="footer-brand"><Brand /><p>Portfólio de obras, reformas, instalações, manutenções e adequações.</p></div>
        <nav className="portfolio-footer-nav" aria-label="Navegação do rodapé">
          <Link to="/#projetos">Portfólio</Link>
          <Link to="/#empresa">Quem somos</Link>
          <Link to="/#servicos">Atuação</Link>
          <Link to="/#contato">Contato</Link>
        </nav>
        <div className="footer-contact">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><Phone /> {company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}><Mail /> {company.email}</a>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {company.legalName}. Todos os direitos reservados.</span><Link to="/#inicio" aria-label="Voltar ao topo">Voltar ao topo <ArrowUp /></Link></div>
    </footer>
  )
}
