export interface CartilhaSubsection {
  title: string;
  content: string;
  fieldWarning?: string;
  highlightTips?: string[];
}

export interface CartilhaChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  iconName: string;
  summary: string;
  subsections: CartilhaSubsection[];
}

export interface CartilhaMetadata {
  title: string;
  version: string;
  author: string;
  editionYear: number;
  region: string;
  isSavedOffline: boolean;
  savedAt?: string;
  totalChapters: number;
}
