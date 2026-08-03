export const company = {
  name: 'GAMAK',
  legalName: 'GAMAK Soluções em Engenharia',
  website: 'https://gamak-engenharia.vercel.app',
  description: 'Obras, instalações, manutenções e adequações conduzidas com planejamento e responsabilidade técnica.',
  phoneDisplay: '+55 (11) 97029-1800',
  phoneDigits: '5511970291800',
  email: 'gamakengenharia@gmail.com',
  instagram: '', // Confirmar no material institucional antes de publicar.
  whatsappMessage: 'Olá, GAMAK! Conheci a empresa pelo site e gostaria de solicitar uma avaliação para o meu projeto.',
} as const

export const whatsappUrl = (message: string = company.whatsappMessage) =>
  `https://wa.me/${company.phoneDigits}?text=${encodeURIComponent(message)}`
