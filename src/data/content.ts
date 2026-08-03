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
