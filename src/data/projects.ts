export type ProjectCategory =
  | 'obras'
  | 'reformas'
  | 'eletrica'
  | 'hidraulica'
  | 'manutencao'
  | 'pintura'
  | 'reparos'

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  obras: 'Obras',
  reformas: 'Reformas',
  eletrica: 'Instalações elétricas',
  hidraulica: 'Instalações hidráulicas',
  manutencao: 'Manutenções',
  pintura: 'Pinturas',
  reparos: 'Reparos',
}

export const FILTER_OPTIONS = [
  { id: 'todos', label: 'Todos' },
  { id: 'obras', label: 'Obras' },
  { id: 'reformas', label: 'Reformas' },
  { id: 'eletrica', label: 'Elétrica' },
  { id: 'hidraulica', label: 'Hidráulica' },
  { id: 'manutencao', label: 'Manutenção' },
  { id: 'pintura', label: 'Pintura' },
] as const

export type FilterId = (typeof FILTER_OPTIONS)[number]['id']

export type Project = {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  description: string
  coverImage: string
  images: string[]
  services: string[]
  location?: string
  challenge?: string
  solution?: string
  result?: string
  featured?: boolean
  beforeImage?: string
  afterImage?: string
  objectPosition?: string
  alt: string
  size?: 'featured' | 'wide' | 'standard'
  imageBase?: string
}

const legacyImage = (name: string) => ({
  coverImage: `/images/projects/optimized/${name}-1440.webp`,
  images: [`/images/projects/optimized/${name}-1440.webp`],
  imageBase: name,
})

export const projects: Project[] = [
  {
    id: 'montagem-esteiras-rolantes',
    slug: 'montagem-esteiras-rolantes',
    title: 'Montagem de esteiras rolantes',
    category: 'obras',
    description: 'Execução técnica durante a montagem e integração de esteiras rolantes em ambiente comercial.',
    alt: 'Técnicos trabalhando na montagem de esteiras rolantes em ambiente comercial',
    objectPosition: '50% 40%',
    size: 'featured',
    featured: true,
    services: ['Montagem de equipamentos', 'Integração estrutural', 'Acompanhamento técnico'],
    challenge: 'Integrar esteiras rolantes ao fluxo de circulação de um ambiente comercial em operação.',
    solution: 'Montagem coordenada dos componentes, alinhamento das esteiras e verificação da infraestrutura de apoio.',
    result: 'Conjunto de esteiras integrado e pronto para operação no ambiente comercial.',
    ...legacyImage('projeto-esteira-rolante-03'),
  },
  {
    id: 'esteiras-rolantes-operacao',
    slug: 'esteiras-rolantes-operacao',
    title: 'Esteiras rolantes em operação',
    category: 'obras',
    description: 'Registro do conjunto de esteiras rolantes integrado à circulação de um ambiente comercial.',
    alt: 'Conjunto de esteiras rolantes instalado em ambiente comercial iluminado',
    objectPosition: '50% 50%',
    services: ['Instalação de equipamentos', 'Infraestrutura de circulação'],
    ...legacyImage('projeto-esteira-rolante-01'),
  },
  {
    id: 'quadra-poliesportiva-revitalizada',
    slug: 'quadra-poliesportiva-revitalizada',
    title: 'Quadra poliesportiva revitalizada',
    category: 'pintura',
    description: 'Resultado da recuperação de superfície, pintura e nova demarcação de uma quadra poliesportiva.',
    alt: 'Vista ampla de quadra poliesportiva verde após revitalização',
    objectPosition: '50% 50%',
    featured: true,
    services: ['Recuperação de superfície', 'Pintura esportiva', 'Demarcação de linhas'],
    challenge: 'Superfície esportiva deteriorada, com acabamento comprometido e demarcações desgastadas.',
    solution: 'Preparação da base, remoção do revestimento antigo, aplicação de novo sistema de pintura e demarcação.',
    result: 'Quadra com piso uniforme, demarcações legíveis e pronta para uso.',
    beforeImage: '/images/projects/optimized/revitalizacao-quadra-preparacao-1440.webp',
    afterImage: '/images/projects/optimized/revitalizacao-quadra-esportiva-02-1440.webp',
    images: [
      '/images/projects/optimized/revitalizacao-quadra-preparacao-1440.webp',
      '/images/projects/optimized/revitalizacao-quadra-esportiva-02-1440.webp',
      '/images/projects/optimized/revitalizacao-quadra-esportiva-03-1440.webp',
    ],
    coverImage: '/images/projects/optimized/revitalizacao-quadra-esportiva-02-1440.webp',
    imageBase: 'revitalizacao-quadra-esportiva-02',
  },
  {
    id: 'pintura-demarcacao-quadra',
    slug: 'pintura-demarcacao-quadra',
    title: 'Pintura e demarcação de quadra',
    category: 'pintura',
    description: 'Acabamento de piso esportivo com demarcações organizadas para diferentes modalidades.',
    alt: 'Quadra esportiva verde com demarcações brancas recém-executadas',
    objectPosition: '50% 48%',
    services: ['Pintura de piso esportivo', 'Demarcação técnica'],
    ...legacyImage('revitalizacao-quadra-esportiva-03'),
  },
  {
    id: 'instalacao-esteira-rolante',
    slug: 'instalacao-esteira-rolante',
    title: 'Instalação de esteira rolante',
    category: 'obras',
    description: 'Acompanhamento da infraestrutura e dos componentes durante a instalação do equipamento.',
    alt: 'Estrutura interna de esteira rolante durante instalação em ambiente comercial',
    objectPosition: '50% 42%',
    size: 'wide',
    services: ['Instalação de equipamentos', 'Infraestrutura de apoio'],
    ...legacyImage('projeto-esteira-rolante-02'),
  },
  {
    id: 'recuperacao-piso-esportivo',
    slug: 'recuperacao-piso-esportivo',
    title: 'Recuperação de piso esportivo',
    category: 'manutencao',
    description: 'Revitalização de quadra com recuperação da superfície e renovação das linhas de jogo.',
    alt: 'Detalhe do piso verde de quadra esportiva revitalizada',
    objectPosition: '50% 58%',
    services: ['Recuperação de superfície', 'Manutenção de piso esportivo'],
    ...legacyImage('revitalizacao-quadra-esportiva-01'),
  },
  {
    id: 'demolicao-ambiente-comercial',
    slug: 'demolicao-ambiente-comercial',
    title: 'Demolição técnica em ambiente comercial',
    category: 'reformas',
    description: 'Remoção controlada de elementos construtivos para preparação de uma nova solução no espaço.',
    alt: 'Ambiente comercial durante etapa controlada de demolição',
    objectPosition: '50% 45%',
    services: ['Demolição controlada', 'Preparação de ambiente'],
    ...legacyImage('adequacao-ambiente-comercial-02'),
  },
  {
    id: 'adequacao-estrutural-comercial',
    slug: 'adequacao-estrutural-comercial',
    title: 'Adequação estrutural em área comercial',
    category: 'reformas',
    description: 'Registros de demolição, preparação estrutural e acompanhamento de serviço técnico em área de circulação.',
    alt: 'Composição com etapas de adequação estrutural em ambiente comercial',
    objectPosition: '50% 45%',
    services: ['Demolição', 'Preparação estrutural', 'Adequação de circulação'],
    ...legacyImage('adequacao-ambiente-comercial-01'),
  },
  {
    id: 'impermeabilizacao-area-externa',
    slug: 'impermeabilizacao-area-externa',
    title: 'Impermeabilização de área externa',
    category: 'manutencao',
    description: 'Preparação de base e aplicação de sistema de impermeabilização antes das etapas de acabamento.',
    alt: 'Área externa em obra com base preparada para impermeabilização',
    objectPosition: '50% 52%',
    services: ['Preparação de base', 'Impermeabilização'],
    ...legacyImage('impermeabilizacao-area-externa-01'),
  },
  {
    id: 'tratamento-impermeabilizacao',
    slug: 'tratamento-impermeabilizacao',
    title: 'Tratamento de impermeabilização',
    category: 'manutencao',
    description: 'Execução de tratamento em área externa com organização das bases e encontros construtivos.',
    alt: 'Área externa de edifício durante execução de impermeabilização',
    objectPosition: '50% 62%',
    size: 'wide',
    services: ['Impermeabilização', 'Tratamento de encontros'],
    ...legacyImage('impermeabilizacao-area-externa-02'),
  },
  {
    id: 'execucao-base-contrapiso',
    slug: 'execucao-base-contrapiso',
    title: 'Execução de base e contrapiso',
    category: 'obras',
    description: 'Distribuição e nivelamento de material para formação da base do piso.',
    alt: 'Profissionais executando nivelamento de base e contrapiso',
    objectPosition: '52% 48%',
    services: ['Contrapiso', 'Nivelamento', 'Base para piso'],
    ...legacyImage('execucao-contrapiso-01'),
  },
  {
    id: 'adequacao-instalacao-hidraulica',
    slug: 'adequacao-instalacao-hidraulica',
    title: 'Adequação de instalação hidráulica',
    category: 'hidraulica',
    description: 'Intervenção em parede e tubulações para adequação da infraestrutura hidráulica.',
    alt: 'Profissional realizando adequação de tubulações hidráulicas em parede',
    objectPosition: '50% 48%',
    services: ['Adequação hidráulica', 'Tubulações', 'Infraestrutura em parede'],
    ...legacyImage('instalacao-hidraulica-01'),
  },
  {
    id: 'requalificacao-area-externa',
    slug: 'requalificacao-area-externa',
    title: 'Requalificação de área externa',
    category: 'obras',
    description: 'Intervenção civil para reorganização de bases, canteiros e infraestrutura de área externa.',
    alt: 'Área externa com canteiros e bases durante obra de requalificação',
    objectPosition: '50% 48%',
    services: ['Obra civil externa', 'Reorganização de bases', 'Infraestrutura'],
    ...legacyImage('obra-area-externa-01'),
  },
  {
    id: 'preparacao-superficie-esportiva',
    slug: 'preparacao-superficie-esportiva',
    title: 'Preparação de superfície esportiva',
    category: 'pintura',
    description: 'Remoção do acabamento deteriorado para receber o novo sistema de pintura da quadra.',
    alt: 'Profissional removendo revestimento deteriorado de quadra esportiva',
    objectPosition: '58% 48%',
    services: ['Preparação de superfície', 'Remoção de revestimento'],
    ...legacyImage('revitalizacao-quadra-preparacao'),
  },
  {
    id: 'reforma-banheiro-concluida',
    slug: 'reforma-banheiro-concluida',
    title: 'Reforma de banheiro concluída',
    category: 'reformas',
    description: 'Finalização de revestimentos e instalação dos componentes de uma área molhada.',
    alt: 'Box de banheiro finalizado com revestimento claro e chuveiro instalado',
    objectPosition: '50% 42%',
    featured: true,
    services: ['Revestimentos', 'Instalações', 'Acabamento de área molhada'],
    challenge: 'Área molhada necessitando de renovação completa de revestimentos e componentes.',
    solution: 'Execução de revestimentos, instalação de louças, metais e acabamentos finais.',
    result: 'Banheiro finalizado com revestimentos uniformes e componentes instalados.',
    ...legacyImage('reforma-banheiro-finalizada'),
  },
  {
    id: 'remocao-revestimento-ceramico',
    slug: 'remocao-revestimento-ceramico',
    title: 'Remoção de revestimento cerâmico',
    category: 'reformas',
    description: 'Preparação de parede após retirada completa do revestimento existente.',
    alt: 'Parede preparada após remoção completa de revestimento cerâmico',
    objectPosition: '50% 45%',
    services: ['Demolição de revestimento', 'Preparação de parede'],
    ...legacyImage('reforma-remocao-revestimento-01'),
  },
  {
    id: 'diagnostico-revestimento-ceramico',
    slug: 'diagnostico-revestimento-ceramico',
    title: 'Diagnóstico de revestimento cerâmico',
    category: 'manutencao',
    description: 'Identificação de deslocamento de peças para definição da intervenção corretiva.',
    alt: 'Parede revestida em avaliação por deslocamento de peças cerâmicas',
    objectPosition: '50% 45%',
    services: ['Diagnóstico técnico', 'Inspeção de revestimento'],
    ...legacyImage('manutencao-revestimento-01'),
  },
  {
    id: 'reposicao-revestimento-ceramico',
    slug: 'reposicao-revestimento-ceramico',
    title: 'Reposição de revestimento cerâmico',
    category: 'reparos',
    description: 'Etapa de recomposição e alinhamento de peças após a retirada do material comprometido.',
    alt: 'Parede durante execução de reposição de revestimento cerâmico',
    objectPosition: '58% 45%',
    services: ['Reposição de peças', 'Recomposição de revestimento'],
    ...legacyImage('manutencao-revestimento-02'),
  },
]

export const featuredProjects = projects.filter(project => project.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

export function projectSrcSet(imageBase: string): string {
  return [480, 960, 1440].map(width => `/images/projects/optimized/${imageBase}-${width}.webp ${width}w`).join(', ')
}

export function projectImageSrc(imageBase: string, width = 1440): string {
  return `/images/projects/optimized/${imageBase}-${width}.webp`
}

export function matchesFilter(project: Project, filter: FilterId): boolean {
  if (filter === 'todos') return true
  return project.category === filter
}
