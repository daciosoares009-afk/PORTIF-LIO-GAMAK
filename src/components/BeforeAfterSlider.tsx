import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
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
  const rangeId = useId()

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

  const updatePositionByKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowLeft') {
      setPosition(current => Math.max(0, current - 5))
    }
    if (event.key === 'ArrowRight') {
      setPosition(current => Math.min(100, current + 5))
    }
    if (event.key === 'Home') {
      setPosition(0)
    }
    if (event.key === 'End') {
      setPosition(100)
    }
  }

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
      <div className="before-after-controls">
        <label htmlFor={rangeId} className="sr-only">Ajustar comparação antes e depois</label>
        <input
          id={rangeId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={event => setPosition(Number(event.target.value))}
          onKeyDown={updatePositionByKey}
          aria-label="Ajustar comparação antes e depois"
        />
      </div>
    </div>
  )
}
