import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { THEME } from '../../constants/theme';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Card: React.FC<CardProps> = ({ children, style, testID }) => {
  return (
    <View testID={testID} style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.surfaceCard,
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
