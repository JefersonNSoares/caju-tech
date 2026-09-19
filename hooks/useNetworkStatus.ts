import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NetworkState, ConnectionType } from '../types/network';

export function useNetworkStatus(): NetworkState {
  const [networkState, setNetworkState] = useState<NetworkState>(() => {
    const isOnline = Platform.OS === 'web' && typeof navigator !== 'undefined'
      ? navigator.onLine
      : true;

    return {
      isConnected: isOnline,
      isInternetReachable: isOnline,
      isOffline: !isOnline,
      connectionType: isOnline ? 'unknown' : 'none',
      lastCheckedAt: Date.now(),
    };
  });

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleOnline = () => {
        setNetworkState({
          isConnected: true,
          isInternetReachable: true,
          isOffline: false,
          connectionType: 'unknown',
          lastCheckedAt: Date.now(),
        });
      };

      const handleOffline = () => {
        setNetworkState({
          isConnected: false,
          isInternetReachable: false,
          isOffline: true,
          connectionType: 'none',
          lastCheckedAt: Date.now(),
        });
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected;
      const isReachable = state.isInternetReachable;
      const isOffline = !isConnected || isReachable === false;

      setNetworkState({
        isConnected,
        isInternetReachable: isReachable,
        isOffline,
        connectionType: (state.type as ConnectionType) || 'unknown',
        lastCheckedAt: Date.now(),
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
}
