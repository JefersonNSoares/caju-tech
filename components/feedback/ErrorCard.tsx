import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { Button } from '../common/Button';

export interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  testID?: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  title = 'Instabilidade temporária',
  message = 'Não foi possível carregar as informações agora. Por favor, tente novamente.',
  onRetry,
  retryLabel = 'Tentar novamente',
  isRetrying = false,
  testID = 'error-card',
}) => {
  return (
    <View testID={testID} style={styles.card}>
      <View style={styles.iconContainer}>
        <Feather name="alert-triangle" size={32} color={THEME.colors.error} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.actionContainer}>
        <Button
          label={retryLabel}
          onPress={onRetry}
          loading={isRetrying}
          variant="outline"
          size="sm"
          icon={<Feather name="refresh-cw" size={16} color={THEME.colors.primary} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FFCDD2',
    borderWidth: 1,
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    marginVertical: THEME.dimensions.spacing.sm,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: THEME.dimensions.spacing.xs,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: THEME.dimensions.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.error,
    marginBottom: 4,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  actionContainer: {
    width: '100%',
    maxWidth: 220,
  },
});
