import { ArrowUp, Mail, Phone } from 'lucide-react'
import { company, whatsappUrl } from '../config/company'
import { Brand } from './Brand'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-lead">
        <span className="eyebrow">GAMAK · Engenharia</span>
        <p>Soluções conduzidas com planejamento, responsabilidade e atenção técnica.</p>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand"><Brand /><p>Obras, instalações, manutenções e adequações para diferentes contextos de uso.</p></div>
        <div><strong>Navegação</strong><a href="#empresa">Empresa</a><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#contato">Contato</a></div>
        <div><strong>Serviços</strong><a href="#servicos">Obras e reformas</a><a href="#servicos">Instalações</a><a href="#servicos">Manutenções</a><a href="#servicos">Adequações comerciais</a></div>
        <div className="footer-contact"><strong>Contato</strong><a href={whatsappUrl()} target="_blank" rel="noreferrer"><Phone /> {company.phoneDisplay}</a><a href={`mailto:${company.email}`}><Mail /> {company.email}</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {company.legalName}. Todos os direitos reservados.</span><a href="#inicio" aria-label="Voltar ao topo">Voltar ao topo <ArrowUp /></a></div>
    </footer>
  )
}
