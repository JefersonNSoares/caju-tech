import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';

export interface OfflineBannerProps {
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
  testID?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  message = 'Sinal ausente — navegando com dados salvos',
  onRetry,
  compact = false,
  testID = 'offline-banner',
}) => {
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        compact ? styles.compactContainer : styles.standardContainer,
      ]}
    >
      <View style={styles.content}>
        <Feather name="wifi-off" size={compact ? 16 : 20} color="#FFFFFF" />
        <Text style={[styles.text, compact && styles.compactText]}>
          {message}
        </Text>
      </View>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={styles.retryButton}
          accessibilityRole="button"
          accessibilityLabel="Tentar reconectar"
        >
          <Text style={styles.retryText}>Tentar</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.offline,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 999,
  },
  standardContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  compactContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
  },
  compactText: {
    fontSize: 12,
  },
  retryButton: {
    minHeight: 48,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    marginLeft: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
