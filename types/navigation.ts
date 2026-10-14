export type RootTabRoute = 'index' | 'cultivo' | 'derivados' | 'sustentabilidade' | 'recursos';

export interface TabRouteConfig {
  name: RootTabRoute;
  title: string;
  iconName: string;
  badgeCount?: number;
}

export interface DerivadosRouteParams {
  id: string;
}

export interface QuizRoundRouteParams {
  category?: string;
  count?: string;
}

export interface QuizResultRouteParams {
  score?: string;
  total?: string;
  percentage?: string;
  category?: string;
  badgeTitle?: string;
  badgeIcon?: string;
}
