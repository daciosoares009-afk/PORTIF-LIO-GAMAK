import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = path.resolve('public/images/projects/originals')
const outputDir = path.resolve('public/images/projects/optimized')

const images = [
  ['WhatsApp Image 2026-08-02 at 18.35.28 (1).jpeg', 'reforma-banheiro-finalizada'],
  ['WhatsApp Image 2026-08-02 at 18.35.28.jpeg', 'revitalizacao-quadra-esportiva-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.29 (1).jpeg', 'execucao-contrapiso-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.29 (2).jpeg', 'revitalizacao-quadra-preparacao'],
  ['WhatsApp Image 2026-08-02 at 18.35.29.jpeg', 'obra-area-externa-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.30 (1).jpeg', 'revitalizacao-quadra-esportiva-02'],
  ['WhatsApp Image 2026-08-02 at 18.35.30 (2).jpeg', 'adequacao-ambiente-comercial-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.30 (3).jpeg', 'reforma-remocao-revestimento-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.30.jpeg', 'revitalizacao-quadra-esportiva-03'],
  ['WhatsApp Image 2026-08-02 at 18.35.31 (1).jpeg', 'instalacao-hidraulica-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.31 (2).jpeg', 'impermeabilizacao-area-externa-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.31 (3).jpeg', 'projeto-esteira-rolante-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.31 (4).jpeg', 'impermeabilizacao-area-externa-02'],
  ['WhatsApp Image 2026-08-02 at 18.35.31.jpeg', 'adequacao-ambiente-comercial-02'],
  ['WhatsApp Image 2026-08-02 at 18.35.32 (1).jpeg', 'manutencao-revestimento-01'],
  ['WhatsApp Image 2026-08-02 at 18.35.32 (2).jpeg', 'manutencao-revestimento-02'],
  ['WhatsApp Image 2026-08-02 at 18.35.32 (3).jpeg', 'projeto-esteira-rolante-02'],
  ['WhatsApp Image 2026-08-02 at 18.35.32.jpeg', 'projeto-esteira-rolante-03'],
]

await mkdir(outputDir, { recursive: true })

await Promise.all([480, 960].map(width => sharp(path.resolve('public/images/brand/gamak-logo-oficial.png'))
  .extract({ left: 120, top: 205, width: 1500, height: 420 })
  .resize({ width, height: Math.round(width * 0.28), fit: 'contain', background: '#001c33' })
  .webp({ quality: 91, effort: 5 })
  .toFile(path.resolve(`public/images/brand/gamak-logo-header-${width}.webp`))))

await Promise.all(images.flatMap(([source, name]) => {
  const input = path.join(sourceDir, source)
  return [480, 960, 1440].map(width => sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
    .sharpen(width === 480 ? 0.35 : 0.5)
    .webp({ quality: width === 480 ? 89 : width === 960 ? 91 : 92, effort: 4, smartSubsample: true })
    .toFile(path.join(outputDir, `${name}-${width}.webp`)))
}))

console.log(`Generated the header logo and ${images.length * 3} optimized project images in ${outputDir}`)
