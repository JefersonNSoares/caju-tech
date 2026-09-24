import React from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { AccessiblePressable } from './AccessiblePressable';
import { THEME } from '../../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  testID,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'ghost':
        return styles.ghostButton;
      case 'danger':
        return styles.dangerButton;
      case 'primary':
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'ghost':
        return styles.ghostText;
      case 'danger':
        return styles.dangerText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.sizeSm;
      case 'lg':
        return styles.sizeLg;
      case 'md':
      default:
        return styles.sizeMd;
    }
  };

  return (
    <AccessiblePressable
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseButton,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabledButton,
        style,
      ]}
      accessibilityLabel={label}
    >
      <View style={styles.contentRow}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? THEME.colors.primary : '#FFFFFF'}
          />
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={[styles.baseText, getTextStyle()]}>{label}</Text>
          </>
        )}
      </View>
    </AccessiblePressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: THEME.dimensions.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.dimensions.spacing.md,
  },
  sizeSm: {
    minHeight: 48,
    minWidth: 48,
    paddingVertical: 8,
  },
  sizeMd: {
    minHeight: 48,
    minWidth: 48,
    paddingVertical: 12,
  },
  sizeLg: {
    minHeight: 56,
    minWidth: 56,
    paddingVertical: 16,
  },
  fullWidth: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: THEME.colors.primary,
  },
  secondaryButton: {
    backgroundColor: THEME.colors.cajuYellow,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: THEME.colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: THEME.colors.error,
  },
  disabledButton: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: THEME.colors.textPrimary,
  },
  outlineText: {
    color: THEME.colors.primary,
  },
  ghostText: {
    color: THEME.colors.primary,
  },
  dangerText: {
    color: '#FFFFFF',
  },
});
