import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

export interface CajuTechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showPlaceholderLabel?: boolean;
  imageSource?: ImageSourcePropType;
  testID?: string;
}

export interface LogoDimensions {
  width: number;
  height: number;
  containerWidth: number;
  containerHeight: number;
}

export const getDimensions = (size: 'sm' | 'md' | 'lg' | 'xl' = 'lg'): LogoDimensions => {
  switch (size) {
    case 'sm':
      return {
        width: 48,
        height: 48,
        containerWidth: 48,
        containerHeight: 48,
      };
    case 'md':
      return {
        width: 120,
        height: 120,
        containerWidth: 120,
        containerHeight: 120,
      };
    case 'xl':
      return {
        width: 200,
        height: 200,
        containerWidth: 200,
        containerHeight: 200,
      };
    case 'lg':
    default:
      return {
        width: 160,
        height: 160,
        containerWidth: 160,
        containerHeight: 160,
      };
  }
};

export const CajuTechLogo: React.FC<CajuTechLogoProps> = ({
  size = 'lg',
  showTagline,
  showPlaceholderLabel,
  imageSource,
  testID = 'cajutech-logo',
}) => {
  const dim = getDimensions(size);
  const source = imageSource || require('../../assets/logo.jpg');

  return (
    <View testID={testID} style={[styles.container, { width: dim.width, height: dim.height }]}>
      <Image
        source={source}
        style={{ width: dim.width, height: dim.height }}
        resizeMode="contain"
        accessibilityLabel="Logótipo CajuTech"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

