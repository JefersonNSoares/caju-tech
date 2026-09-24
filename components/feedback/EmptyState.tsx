import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { Button } from '../common/Button';

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  iconName?: keyof typeof Feather.glyphMap;
  testID?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  iconName = 'inbox',
  testID = 'empty-state',
}) => {
  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name={iconName} size={40} color={THEME.colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionLabel && onAction && (
        <View style={styles.actionContainer}>
          <Button label={actionLabel} onPress={onAction} variant="outline" size="md" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: THEME.dimensions.spacing.xl,
    minHeight: 240,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.colors.earthLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: THEME.dimensions.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    textAlign: 'center',
    marginBottom: THEME.dimensions.spacing.xs,
  },
  description: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
  actionContainer: {
    marginTop: THEME.dimensions.spacing.md,
  },
});
