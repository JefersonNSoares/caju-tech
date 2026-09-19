export type ConnectionType = 'wifi' | 'cellular' | 'ethernet' | 'unknown' | 'none';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  isOffline: boolean;
  connectionType: ConnectionType;
  lastCheckedAt: number;
}
