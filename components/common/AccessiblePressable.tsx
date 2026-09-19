import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  PressableStateCallbackType,
} from 'react-native';
import { THEME } from '../../constants/theme';

export interface AccessiblePressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  minTouchSize?: number;
  children: React.ReactNode;
  testID?: string;
}

export const AccessiblePressable: React.FC<AccessiblePressableProps> = ({
  style,
  minTouchSize = THEME.dimensions.minTouchTarget,
  children,
  testID,
  ...rest
}) => {
  return (
    <Pressable
      testID={testID}
      style={(state) => [
        {
          minWidth: minTouchSize,
          minHeight: minTouchSize,
          justifyContent: 'center',
          alignItems: 'center',
        },
        typeof style === 'function' ? style(state) : style,
        state.pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
});
