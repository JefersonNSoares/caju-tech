import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from '../common/AccessiblePressable';
import { QuizOption } from '../../types/quiz';

export interface QuizOptionButtonProps {
  option: QuizOption;
  optionIndex: number;
  isSelected: boolean;
  isCorrect?: boolean;
  isAnswered: boolean;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const QuizOptionButton: React.FC<QuizOptionButtonProps> = ({
  option,
  optionIndex,
  isSelected,
  isCorrect,
  isAnswered,
  onSelect,
  disabled = false,
}) => {
  const letter = OPTION_LETTERS[optionIndex] || `${optionIndex + 1}`;

  // Definição de estados visuais
  let containerStyle = styles.defaultContainer;
  let letterContainerStyle = styles.defaultLetter;
  let letterTextStyle = styles.defaultLetterText;
  let textStyle = styles.defaultText;
  let statusIcon: React.ReactNode = null;

  if (isAnswered) {
    if (isCorrect) {
      containerStyle = styles.correctContainer;
      letterContainerStyle = styles.correctLetter;
      letterTextStyle = styles.whiteLetterText;
      textStyle = styles.correctText;
      statusIcon = <Feather name="check-circle" size={20} color="#2E7D32" />;
    } else if (isSelected) {
      containerStyle = styles.wrongContainer;
      letterContainerStyle = styles.wrongLetter;
      letterTextStyle = styles.whiteLetterText;
      textStyle = styles.wrongText;
      statusIcon = <Feather name="x-circle" size={20} color="#C62828" />;
    } else {
      containerStyle = styles.disabledContainer;
      textStyle = styles.dimmedText;
    }
  } else if (isSelected) {
    containerStyle = styles.selectedContainer;
    letterContainerStyle = styles.selectedLetter;
    letterTextStyle = styles.whiteLetterText;
    textStyle = styles.selectedText;
  }

  return (
    <AccessiblePressable
      onPress={() => onSelect(option.id)}
      disabled={disabled || isAnswered}
      minTouchSize={48}
      style={[styles.baseButton, containerStyle]}
      accessibilityRole="button"
      accessibilityLabel={`Alternativa ${letter}: ${option.text}`}
      testID={`quiz-option-${option.id}`}
    >
      <View style={styles.contentRow}>
        <View style={[styles.letterBadge, letterContainerStyle]}>
          <Text style={[styles.letterText, letterTextStyle]}>{letter}</Text>
        </View>

        <Text style={[styles.optionText, textStyle]}>{option.text}</Text>

        {statusIcon && <View style={styles.iconContainer}>{statusIcon}</View>}
      </View>
    </AccessiblePressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    width: '100%',
    minHeight: 52,
    minWidth: 48,
    borderRadius: THEME.dimensions.radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 6,
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  letterBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  letterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
  },
  iconContainer: {
    marginLeft: 8,
  },

  // Estado Padrão
  defaultContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  defaultLetter: {
    backgroundColor: '#F5F5F5',
  },
  defaultLetterText: {
    color: THEME.colors.textPrimary,
  },
  defaultText: {
    color: THEME.colors.textPrimary,
  },

  // Estado Selecionado
  selectedContainer: {
    backgroundColor: '#E8F5E9',
    borderColor: THEME.colors.primary,
  },
  selectedLetter: {
    backgroundColor: THEME.colors.primary,
  },
  selectedText: {
    color: THEME.colors.primaryDark,
    fontWeight: '700',
  },

  // Estado Correto
  correctContainer: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  correctLetter: {
    backgroundColor: '#2E7D32',
  },
  correctText: {
    color: '#1B5E20',
    fontWeight: '700',
  },

  // Estado Incorreto
  wrongContainer: {
    backgroundColor: '#FFEBEE',
    borderColor: '#C62828',
  },
  wrongLetter: {
    backgroundColor: '#C62828',
  },
  wrongText: {
    color: '#B71C1C',
    fontWeight: '600',
  },

  // Outras desabilitadas
  disabledContainer: {
    backgroundColor: '#FAFAFA',
    borderColor: '#EFEFEF',
    opacity: 0.6,
  },
  dimmedText: {
    color: THEME.colors.textMuted,
  },

  whiteLetterText: {
    color: '#FFFFFF',
  },
});
