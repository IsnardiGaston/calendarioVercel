import type { Masterclass } from '@/lib/strapi'

export const MOCK_MASTERCLASSES: Masterclass[] = [
  {
    id: 1,
    initials: 'NF',
    presenter: 'Nico Fernández Miranda',
    date: '18 / 05',
    topic: 'CONCENTRACIÓN',
    title: 'Atención bajo amenaza: por qué se te escapa el foco y cómo recuperarlo',
    description:
      'Trabajás más horas que nunca y rendís menos que antes. Te muestro qué le está pasando a tu cerebro y qué dice la evidencia para volver a concentrarte.',
    category: 'Neurociencia aplicada',
    imageUrl: '/images/concentracion.jpg',
  },
  {
    id: 2,
    initials: 'NF',
    presenter: 'Nico Fernández Miranda',
    date: '19 / 05',
    topic: 'HÁBITOS',
    title: 'Arrancás siempre, terminás nunca: la neurociencia de los hábitos que no aguantan',
    description:
      'La motivación dura tres semanas; un sistema bien diseñado dura años. Vamos a ver qué tiene que pasar en tu cerebro para que un hábito se instale de verdad.',
    category: 'Neurociencia aplicada',
    imageUrl: '/images/habitos.jpg',
  },
  {
    id: 3,
    initials: 'NF',
    presenter: 'Nico Fernández Miranda',
    date: '20 / 05',
    topic: 'PROCRASTINACIÓN',
    title: 'Sé lo que tengo que hacer, pero no me sale: la mecánica neuronal de postergar',
    description:
      'Procrastinar no es vagancia ni falta de carácter, es una respuesta emocional con un mapa cerebral preciso. Vas a entender por qué tu cerebro frena justo cuando más necesitás avanzar.',
    category: 'Neurociencia aplicada',
    imageUrl: '/images/procrastinacion.jpg',
  },
]
