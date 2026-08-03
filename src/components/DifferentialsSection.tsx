import { ArrowUpRight } from 'lucide-react'
import { differentials } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="section differentials-section" aria-labelledby="differentials-title">
      <div className="container differentials-layout">
        <div className="differentials-copy reveal">
          <SectionHeading
            number="07"
            eyebrow="Diferenciais"
            title="O que faz a diferença na execução."
            copy="A GAMAK combina técnica, organização e presença constante para garantir segurança, eficiência e bom resultado."
          />
          <a className="text-link" href="#contato">
            Falar com a equipe <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="differentials-list" role="list">
          {differentials.map(({ title, Icon }, index) => (
            <div key={title} className="differential reveal" style={{ '--delay': `${index * 60}ms` } as React.CSSProperties} role="listitem">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <ArrowUpRight aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
