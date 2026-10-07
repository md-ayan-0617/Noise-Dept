export type CursorStateType =
  | 'default'
  | 'open'
  | 'view'
  | 'drag'
  | 'play'
  | 'out'
  | 'start'
  | 'break'
  | 'lost';

export interface ProjectItem {
  slug: string;
  index: string;
  title: string;
  category: 'Fashion commerce' | 'Music platform' | 'Interactive album campaign' | 'Fashion archive' | 'Creative software' | 'Culture magazine' | 'Experimental';
  client: string;
  year: string;
  accentColor: string; // e.g. '#EC3D31', '#C7FF32', '#3155FF', '#FF6433', '#A894FF'
  coverImage: string;
  secondaryImages: string[];
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  services: string[];
  codeSnippet: string;
  nextSlug: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  stack: string[];
  previewImage: string;
}

export interface ProcessStepItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  humanPresence: string;
  image: string;
  output: string;
}

export interface LabItem {
  number: string;
  title: string;
  type: 'type-reactor' | 'pixel-burial' | 'webgl-poster' | 'sound-grid' | 'cursor-machine' | 'broken-clock';
  subtitle: string;
  description: string;
  tags: string[];
}

export interface NoteItem {
  slug: string;
  number: string;
  title: string;
  category: 'DESIGN' | 'CODE' | 'PROCESS' | 'BUSINESS' | 'TOOLS' | 'OPINION';
  readTime: string;
  date: string;
  excerpt: string;
  content: {
    intro: string;
    sections: { heading: string; body: string; code?: string; pullQuote?: string }[];
  };
  previewImage: string;
}
