import { Skill } from '../types';

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: 'Tech / Web',
    skills: [
      {
        name: 'HTML',
        icon: 'Code',
        level: 85,
        description: 'Langage de balisage web'
      },
      {
        name: 'CSS',
        icon: 'Palette',
        level: 80,
        description: 'Styles et mise en forme'
      },
      {
        name: 'JavaScript',
        icon: 'FileCode',
        level: 75,
        description: 'Programmation web interactive'
      }
    ]
  },
  {
    title: 'Outils',
    skills: [
      {
        name: 'CRM',
        icon: 'Database',
        level: 85,
        description: 'Gestion relation client'
      },
      {
        name: 'Canva',
        icon: 'Palette',
        level: 80,
        description: 'Design graphique'
      },
      {
        name: 'GitHub',
        icon: 'Github',
        level: 75,
        description: 'Gestion de versions'
      },
      {
        name: 'Microsoft Office',
        icon: 'FileSpreadsheet',
        level: 70,
        description: 'Tableurs et données'
      },
      {
        name: 'CapCut',
        icon: 'Video',
        level: 78,
        description: 'Montage vidéo mobile'
      },
      {
        name: 'ChatGPT',
        icon: 'Brain',
        level: 90,
        description: 'Optimisation des prompts et automatisation'
      }
    ]
  },
  {
    title: 'IA',
    skills: [
      {
        name: 'ChatGPT Prompting',
        icon: 'Brain',
        level: 95,
        description: 'Optimisation des prompts'
      },
      {
        name: 'Agents IA',
        icon: 'Bot',
        level: 90,
        description: 'Création d\'assistants virtuels'
      },
      {
        name: 'Automatisation',
        icon: 'Zap',
        level: 85,
        description: 'Processus automatisés'
      }
    ]
  },
  {
    title: 'Commercial',
    skills: [
      {
        name: 'Vente',
        icon: 'TrendingUp',
        level: 92,
        description: 'Techniques de vente'
      },
      {
        name: 'Relation Client',
        icon: 'Users',
        level: 88,
        description: 'Gestion clientèle'
      },
      {
        name: 'Formation',
        icon: 'GraduationCap',
        level: 85,
        description: 'Formation commerciale'
      },
      {
        name: 'Négociation',
        icon: 'Handshake',
        level: 90,
        description: 'Closing et négociation'
      },
      {
        name: 'Prospection Terrain',
        icon: 'MapPin',
        level: 95,
        description: 'Développement commercial'
      },
      {
        name: 'Prospection Digitale',
        icon: 'Smartphone',
        level: 82,
        description: 'Marketing digital'
      }
    ]
  },
  {
    title: 'Soft Skills',
    skills: [
      {
        name: 'Gestion d\'Équipe',
        icon: 'Users',
        level: 85,
        description: 'Management et leadership'
      },
      {
        name: 'Motivation',
        icon: 'Rocket',
        level: 90,
        description: 'Entrepreneuriat'
      },
      {
        name: 'Résistance au Stress',
        icon: 'Shield',
        level: 90,
        description: 'Gestion de la pression'
      },
      {
        name: 'Autonomie',
        icon: 'Target',
        level: 95,
        description: 'Travail indépendant'
      },
      {
        name: 'Multitâches',
        icon: 'RotateCw',
        level: 90,
        description: 'Gestion simultanée de plusieurs projets'
      },
      {
        name: 'Apprentissage',
        icon: 'BookOpen',
        level: 92,
        description: 'Capacité d\'adaptation'
      }
    ]
  }
];