export type MediaType = 'video' | 'infografico';

export type MediaCategory = 'todos' | 'manejo' | 'enxertia' | 'colheita' | 'derivados';

export interface InfographicStep {
  stepNumber: number;
  title: string;
  description: string;
  criticalNotice?: string;
}

export interface MediaResource {
  id: string;
  type: MediaType;
  category: MediaCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  tag: string;
  duration?: string;
  youtubeId?: string;
  infographicSteps?: InfographicStep[];
  infographicKeyHighlights?: string[];
  bannerColor?: string;
  iconName: string;
}
