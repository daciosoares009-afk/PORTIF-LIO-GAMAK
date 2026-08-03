import { SectionHeading } from './SectionHeading'
import { processSteps } from '../data/content'

export function ProcessSection() {
  return (
    <section id="processo" className="section process-section" aria-labelledby="process-section-title">
      <div className="container process-layout">
        <div className="process-intro reveal">
          <SectionHeading
            number="06"
            eyebrow="Processo de trabalho"
            title="Trabalho organizado do início ao fim."
            copy="Cada fase é conduzida com clareza, acompanhamento técnico e atenção às necessidades do projeto."
          />
          <p className="process-note">Da escuta inicial à entrega final, o fluxo é conduzido com objetividade e responsabilidade.</p>
        </div>
        <ol className="process-list">
          {processSteps.map(([stepNumber, title, description], index) => (
            <li key={stepNumber} className="process-step reveal" style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}>
              <span>{stepNumber}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
