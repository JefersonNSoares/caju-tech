export type AsyncStatus = 'idle' | 'loading' | 'success' | 'empty' | 'offline' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
  canRetry: boolean;
  lastUpdated?: number;
}
