import {
  Building2, Cable, Droplets, HardHat, Settings2, Wrench,
  ClipboardCheck, DraftingCompass, Eye, Handshake, ShieldCheck, TimerReset,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  title: string
  description: string
  scope: string
  Icon: LucideIcon
}

export const services: Service[] = [
  { title: 'Obras e reformas', description: 'Intervenções planejadas para transformar, recuperar e adequar ambientes residenciais, comerciais e empresariais.', scope: 'Planejamento · execução · acabamento', Icon: Building2 },
  { title: 'Instalações elétricas', description: 'Implantação e adequação de sistemas elétricos com organização, compatibilidade e atenção técnica.', scope: 'Implantação · adequação · correção', Icon: Cable },
  { title: 'Instalações hidráulicas', description: 'Soluções para novas instalações, ajustes de infraestrutura e correção de ocorrências hidráulicas.', scope: 'Instalação · adequação · reparo', Icon: Droplets },
  { title: 'Manutenção preventiva e corretiva', description: 'Inspeção, diagnóstico e intervenção para preservar o funcionamento de sistemas, ambientes e equipamentos.', scope: 'Inspeção · diagnóstico · intervenção', Icon: Wrench },
  { title: 'Adequações comerciais', description: 'Reorganização técnica de espaços para responder às necessidades de uso, circulação e operação.', scope: 'Demolição · preparação · adequação', Icon: HardHat },
  { title: 'Infraestrutura e equipamentos', description: 'Instalação e manutenção de equipamentos e dos elementos de infraestrutura necessários à operação.', scope: 'Infraestrutura · instalação · suporte', Icon: Settings2 },
]

export const processSteps = [
  ['01', 'Entendimento da necessidade', 'Escuta atenta para compreender o contexto, as prioridades e o escopo inicial.'],
  ['02', 'Visita e avaliação técnica', 'Levantamento das condições do local e dos pontos relevantes para a solução.'],
  ['03', 'Planejamento da solução', 'Definição organizada das etapas, recursos e critérios técnicos do serviço.'],
  ['04', 'Execução do serviço', 'Condução responsável, comunicação clara e atenção contínua aos detalhes.'],
  ['05', 'Inspeção e entrega', 'Verificação final do trabalho e alinhamento das orientações de uso ou manutenção.'],
] as const

export const differentials = [
  { title: 'Atendimento personalizado', Icon: Handshake },
  { title: 'Planejamento técnico', Icon: DraftingCompass },
  { title: 'Transparência durante o serviço', Icon: Eye },
  { title: 'Atenção aos detalhes', Icon: ClipboardCheck },
  { title: 'Compromisso com prazos', Icon: TimerReset },
  { title: 'Segurança e qualidade', Icon: ShieldCheck },
]

export type Project = {
  id: number
  title: string
  category: string
  description: string
  image: string
  srcSet: string
  alt: string
  objectPosition?: string
}

const projectImage = (name: string) => ({
  image: `/images/projects/optimized/${name}-1440.webp`,
  srcSet: [480, 960, 1440].map(width => `/images/projects/optimized/${name}-${width}.webp ${width}w`).join(', '),
})

export const projects: Project[] = [
  { id: 18, title: 'Montagem de esteiras rolantes', category: 'Equipamentos', description: 'Execução técnica durante a montagem e integração de esteiras rolantes em ambiente comercial.', alt: 'Técnicos trabalhando na montagem de esteiras rolantes em ambiente comercial', objectPosition: '50% 40%', ...projectImage('projeto-esteira-rolante-03') },
  { id: 12, title: 'Esteiras rolantes em operação', category: 'Equipamentos', description: 'Registro do conjunto de esteiras rolantes integrado à circulação de um ambiente comercial.', alt: 'Conjunto de esteiras rolantes instalado em ambiente comercial iluminado', objectPosition: '50% 50%', ...projectImage('projeto-esteira-rolante-01') },
  { id: 6, title: 'Quadra poliesportiva revitalizada', category: 'Obras', description: 'Resultado da recuperação de superfície, pintura e nova demarcação de uma quadra poliesportiva.', alt: 'Vista ampla de quadra poliesportiva verde após revitalização', objectPosition: '50% 50%', ...projectImage('revitalizacao-quadra-esportiva-02') },
  { id: 9, title: 'Pintura e demarcação de quadra', category: 'Manutenção', description: 'Acabamento de piso esportivo com demarcações organizadas para diferentes modalidades.', alt: 'Quadra esportiva verde com demarcações brancas recém-executadas', objectPosition: '50% 48%', ...projectImage('revitalizacao-quadra-esportiva-03') },
  { id: 17, title: 'Instalação de esteira rolante', category: 'Instalações', description: 'Acompanhamento da infraestrutura e dos componentes durante a instalação do equipamento.', alt: 'Estrutura interna de esteira rolante durante instalação em ambiente comercial', objectPosition: '50% 42%', ...projectImage('projeto-esteira-rolante-02') },
  { id: 2, title: 'Recuperação de piso esportivo', category: 'Manutenção', description: 'Revitalização de quadra com recuperação da superfície e renovação das linhas de jogo.', alt: 'Detalhe do piso verde de quadra esportiva revitalizada', objectPosition: '50% 58%', ...projectImage('revitalizacao-quadra-esportiva-01') },
  { id: 14, title: 'Demolição técnica em ambiente comercial', category: 'Ambientes comerciais', description: 'Remoção controlada de elementos construtivos para preparação de uma nova solução no espaço.', alt: 'Ambiente comercial durante etapa controlada de demolição', objectPosition: '50% 45%', ...projectImage('adequacao-ambiente-comercial-02') },
  { id: 7, title: 'Adequação estrutural em área comercial', category: 'Ambientes comerciais', description: 'Registros de demolição, preparação estrutural e acompanhamento de serviço técnico em área de circulação.', alt: 'Composição com etapas de adequação estrutural em ambiente comercial', objectPosition: '50% 45%', ...projectImage('adequacao-ambiente-comercial-01') },
  { id: 11, title: 'Impermeabilização de área externa', category: 'Manutenção', description: 'Preparação de base e aplicação de sistema de impermeabilização antes das etapas de acabamento.', alt: 'Área externa em obra com base preparada para impermeabilização', objectPosition: '50% 52%', ...projectImage('impermeabilizacao-area-externa-01') },
  { id: 13, title: 'Tratamento de impermeabilização', category: 'Manutenção', description: 'Execução de tratamento em área externa com organização das bases e encontros construtivos.', alt: 'Área externa de edifício durante execução de impermeabilização', objectPosition: '50% 62%', ...projectImage('impermeabilizacao-area-externa-02') },
  { id: 3, title: 'Execução de base e contrapiso', category: 'Obras', description: 'Distribuição e nivelamento de material para formação da base do piso.', alt: 'Profissionais executando nivelamento de base e contrapiso', objectPosition: '52% 48%', ...projectImage('execucao-contrapiso-01') },
  { id: 10, title: 'Adequação de instalação hidráulica', category: 'Hidráulica', description: 'Intervenção em parede e tubulações para adequação da infraestrutura hidráulica.', alt: 'Profissional realizando adequação de tubulações hidráulicas em parede', objectPosition: '50% 48%', ...projectImage('instalacao-hidraulica-01') },
  { id: 5, title: 'Requalificação de área externa', category: 'Obras', description: 'Intervenção civil para reorganização de bases, canteiros e infraestrutura de área externa.', alt: 'Área externa com canteiros e bases durante obra de requalificação', objectPosition: '50% 48%', ...projectImage('obra-area-externa-01') },
  { id: 4, title: 'Preparação de superfície esportiva', category: 'Manutenção', description: 'Remoção do acabamento deteriorado para receber o novo sistema de pintura da quadra.', alt: 'Profissional removendo revestimento deteriorado de quadra esportiva', objectPosition: '58% 48%', ...projectImage('revitalizacao-quadra-preparacao') },
  { id: 1, title: 'Reforma de banheiro concluída', category: 'Obras', description: 'Finalização de revestimentos e instalação dos componentes de uma área molhada.', alt: 'Box de banheiro finalizado com revestimento claro e chuveiro instalado', objectPosition: '50% 42%', ...projectImage('reforma-banheiro-finalizada') },
  { id: 8, title: 'Remoção de revestimento cerâmico', category: 'Obras', description: 'Preparação de parede após retirada completa do revestimento existente.', alt: 'Parede preparada após remoção completa de revestimento cerâmico', objectPosition: '50% 45%', ...projectImage('reforma-remocao-revestimento-01') },
  { id: 15, title: 'Diagnóstico de revestimento cerâmico', category: 'Manutenção', description: 'Identificação de deslocamento de peças para definição da intervenção corretiva.', alt: 'Parede revestida em avaliação por deslocamento de peças cerâmicas', objectPosition: '50% 45%', ...projectImage('manutencao-revestimento-01') },
  { id: 16, title: 'Reposição de revestimento cerâmico', category: 'Manutenção', description: 'Etapa de recomposição e alinhamento de peças após a retirada do material comprometido.', alt: 'Parede durante execução de reposição de revestimento cerâmico', objectPosition: '58% 45%', ...projectImage('manutencao-revestimento-02') },
]
