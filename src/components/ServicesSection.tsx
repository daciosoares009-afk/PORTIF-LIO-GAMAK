import { ArrowUpRight } from 'lucide-react'
import { whatsappUrl } from '../config/company'
import { services } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function ServicesSection() {
  return (
    <section id="atuacao" className="section services-section">
      <div className="container services-intro">
        <SectionHeading
          number="05"
          eyebrow="O que fazemos"
          title="Áreas de atuação."
          copy="Serviços executados de acordo com a necessidade de cada ambiente."
        />
        <p className="services-note">Atendimento a demandas residenciais, comerciais e empresariais.</p>
      </div>
      <div className="container service-list">
        {services.map(({ title, description, scope, Icon }, index) => (
          <article className="service-row reveal" style={{ '--delay': `${index * 55}ms` } as React.CSSProperties} key={title}>
            <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="service-icon" aria-hidden="true"><Icon /></span>
            <div className="service-copy"><h3>{title}</h3><p>{description}</p><small>{scope}</small></div>
            <a href={whatsappUrl(`Olá, GAMAK! Gostaria de solicitar uma avaliação para ${title.toLowerCase()}.`)} target="_blank" rel="noreferrer" aria-label={`Solicitar avaliação para ${title}`}>Solicitar avaliação <ArrowUpRight /></a>
          </article>
        ))}
      </div>
    </section>
  )
}
