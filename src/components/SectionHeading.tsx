export function SectionHeading({ number, eyebrow, title, copy, center = false }: { number?: string; eyebrow: string; title: string; copy?: string; center?: boolean }) {
  return (
    <header className={`section-heading${center ? ' center' : ''}`}>
      <span className="eyebrow">{number && <b>{number}</b>}{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  )
}
