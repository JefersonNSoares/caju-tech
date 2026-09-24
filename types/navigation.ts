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
