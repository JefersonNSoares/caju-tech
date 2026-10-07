import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';

export interface CajuTechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showPlaceholderLabel?: boolean;
  imageSource?: ImageSourcePropType;
  testID?: string;
}

export const CajuTechLogo: React.FC<CajuTechLogoProps> = ({
  size = 'lg',
  showTagline = true,
  showPlaceholderLabel = true,
  imageSource,
  testID = 'cajutech-logo',
}) => {
  // Dimensões baseadas no tamanho solicitado
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return {
          containerWidth: 120,
          containerHeight: 48,
          iconSize: 28,
          fontSize: 18,
          badgeFontSize: 9,
        };
      case 'md':
        return {
          containerWidth: 180,
          containerHeight: 70,
          iconSize: 40,
          fontSize: 22,
          badgeFontSize: 10,
        };
      case 'xl':
        return {
          containerWidth: 260,
          containerHeight: 180,
          iconSize: 76,
          fontSize: 34,
          badgeFontSize: 12,
        };
      case 'lg':
      default:
        return {
          containerWidth: 220,
          containerHeight: 140,
          iconSize: 58,
          fontSize: 28,
          badgeFontSize: 11,
        };
    }
  };

  const dim = getDimensions();

  // Se houver uma imagem real fornecida, renderiza a imagem
  if (imageSource) {
    return (
      <View testID={testID} style={styles.imageWrapper}>
        <Image
          source={imageSource}
          style={{ width: dim.containerWidth, height: dim.containerHeight }}
          resizeMode="contain"
          accessibilityLabel="Logótipo CajuTech"
        />
      </View>
    );
  }

  // Placeholder oficial estilizado do CajuTech com alta fidelidade visual
  return (
    <View testID={testID} style={styles.container}>
      {/* Container visual do placeholder da imagem do logo */}
      <View
        style={[
          styles.logoCard,
          size === 'sm' && styles.logoCardCompact,
          size === 'md' && styles.logoCardMedium,
        ]}
      >
        {/* Emblema visual do Caju */}
        <View style={styles.emblemRow}>
          <View style={styles.cajuFruitShape}>
            <View style={styles.leafDot} />
            <MaterialCommunityIcons
              name="fruit-cherries"
              size={dim.iconSize * 0.7}
              color="#FFFFFF"
            />
          </View>
          <View style={styles.brandTextGroup}>
            <Text style={[styles.brandTitle, { fontSize: dim.fontSize }]}>
              Caju<Text style={styles.brandAccent}>Tech</Text>
            </Text>
            {showTagline && size !== 'sm' && (
              <Text style={styles.brandTagline}>Cajucultura & Inovação</Text>
            )}
          </View>
        </View>

        {/* Indicador explícito de Placeholder de Imagem oficial */}
        {showPlaceholderLabel && (
          <View style={styles.placeholderBadge}>
            <Feather name="image" size={11} color={THEME.colors.primaryDark} />
            <Text style={[styles.placeholderBadgeText, { fontSize: dim.badgeFontSize }]}>
              Logo CajuTech
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.dimensions.radius.xl,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  logoCardCompact: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: THEME.dimensions.radius.md,
  },
  logoCardMedium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  emblemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cajuFruitShape: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: THEME.colors.cajuOrange,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  leafDot: {
    position: 'absolute',
    top: -2,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.colors.primaryLight,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  brandTextGroup: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontWeight: '900',
    color: THEME.colors.primaryDark,
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: THEME.colors.cajuOrange,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
    letterSpacing: 0.2,
    marginTop: -2,
  },
  placeholderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  placeholderBadgeText: {
    fontWeight: '700',
    color: THEME.colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
