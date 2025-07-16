export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'education' | 'experience' | 'project';
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export type Language = 'fr' | 'en' | 'es' | 'ar' | 'ru' | 'zh' | 'ja' | 'th';