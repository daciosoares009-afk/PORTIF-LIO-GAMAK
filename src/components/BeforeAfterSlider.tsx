import { useCallback, useEffect, useRef, useState } from 'react'
import { ProjectImage } from './ProjectImage'

type BeforeAfterSliderProps = {
  before: string
  after: string
  altBefore: string
  altAfter: string
}

export function BeforeAfterSlider({ before, after, altBefore, altAfter }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current) return
      updatePosition(event.clientX)
    }
    const onPointerUp = () => { dragging.current = false }

    addEventListener('pointermove', onPointerMove)
    addEventListener('pointerup', onPointerUp)
    addEventListener('pointercancel', onPointerUp)
    return () => {
      removeEventListener('pointermove', onPointerMove)
      removeEventListener('pointerup', onPointerUp)
      removeEventListener('pointercancel', onPointerUp)
    }
  }, [updatePosition])

  return (
    <div
      ref={containerRef}
      className="before-after-slider"
      onPointerDown={event => {
        dragging.current = true
        containerRef.current?.setPointerCapture(event.pointerId)
        updatePosition(event.clientX)
      }}
      role="group"
      aria-label="Comparação antes e depois"
    >
      <ProjectImage className="before-after-after" src={after} alt={altAfter} width={1200} height={800} />
      <div className="before-after-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <ProjectImage src={before} alt={altBefore} width={1200} height={800} />
      </div>
      <div className="before-after-handle" style={{ left: `${position}%` }} aria-hidden="true">
        <span />
      </div>
      <span className="before-after-label before-after-label--before">Antes</span>
      <span className="before-after-label before-after-label--after">Depois</span>
    </div>
  )
}
