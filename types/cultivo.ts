import { Feather } from '@expo/vector-icons';

export type CultivoStageId = 'plantio' | 'irrigacao' | 'poda' | 'pragas';

export interface CultivoVideo {
  id: string;
  title: string;
  duration: string;
  summary: string;
  badge: string;
  coverTheme?: 'green' | 'earth' | 'orange' | 'yellow';
}

export interface CultivoStage {
  id: CultivoStageId;
  route: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
  badge: string;
  intro: string;
  orientacoes: string[];
  videos: CultivoVideo[];
}
