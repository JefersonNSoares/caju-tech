import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../../constants/theme';

export interface QuizProgressBarProps {
  currentIndex: number;
  total: number;
  categoryLabel?: string;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  currentIndex,
  total,
  categoryLabel,
}) => {
  const currentStep = currentIndex + 1;
  const progressPercent = Math.min(100, Math.round((currentStep / total) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepText}>
            Questão {currentStep} de {total}
          </Text>
        </View>

        {categoryLabel && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{categoryLabel}</Text>
          </View>
        )}
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progressPercent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: THEME.dimensions.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.dimensions.radius.full,
  },
  stepText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  categoryBadge: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.dimensions.radius.full,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7B1FA2',
  },
  track: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: THEME.colors.primary,
    borderRadius: 4,
  },
});
