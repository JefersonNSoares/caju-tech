export type QuizCategory = 'todas' | 'manejo' | 'pragas' | 'derivados';

export type QuizDifficulty = 'basico' | 'intermediario' | 'avancado';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  categoryLabel: string;
  difficulty: QuizDifficulty;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  fieldTip: string;
}

export interface QuizBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requiredPercentage: number;
}

export interface QuizResultRecord {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  category: QuizCategory;
  badgeEarned?: QuizBadge;
}

export interface QuizStats {
  totalRounds: number;
  bestPercentage: number;
  totalCorrect: number;
  totalAnswered: number;
  unlockedBadgeIds: string[];
}
