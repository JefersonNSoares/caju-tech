import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CultivoVideo } from '../../types/cultivo';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from '../common/AccessiblePressable';
import { Card } from '../common/Card';

export interface VideoCardPlaceholderProps {
  video: CultivoVideo;
  onPress: () => void;
  testID?: string;
}

export const VideoCardPlaceholder: React.FC<VideoCardPlaceholderProps> = ({
  video,
  onPress,
  testID,
}) => {
  // Cores dinâmicas para a capa temática do mockup
  const getThemeBg = () => {
    switch (video.coverTheme) {
      case 'earth':
        return '#3E2723';
      case 'orange':
        return '#BF360C';
      case 'yellow':
        return '#E65100';
      case 'green':
      default:
        return '#1B3B22';
    }
  };

  return (
    <AccessiblePressable
      testID={testID || `video-card-${video.id}`}
      onPress={onPress}
      style={styles.pressable}
      accessibilityRole="button"
      accessibilityLabel={`Assistir vídeo: ${video.title}. Duração: ${video.duration}`}
    >
      <Card style={styles.card}>
        {/* Banner do vídeo com aspect ratio 16:9 simulando o player */}
        <View style={[styles.thumbnailContainer, { backgroundColor: getThemeBg() }]}>
          {/* Overlay suave */}
          <View style={styles.overlay} />

          {/* Badge de categoria no topo esquerdo */}
          <View style={styles.badgeTopLeft}>
            <Text style={styles.badgeText}>{video.badge}</Text>
          </View>

          {/* Badge de duração no topo direito */}
          <View style={styles.durationBadge}>
            <Feather name="clock" size={12} color="#FFFFFF" style={styles.durationIcon} />
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>

          {/* Botão de Play centralizado (estilo protótipo Figma) */}
          <View style={styles.playButtonCircle}>
            <View style={styles.playButtonInner}>
              <Feather name="play" size={26} color="#FFFFFF" style={{ marginLeft: 3 }} />
            </View>
          </View>

          {/* Marca d'água técnica do CajuTech */}
          <View style={styles.watermark}>
            <Feather name="video" size={13} color="rgba(255,255,255,0.7)" />
            <Text style={styles.watermarkText}>CajuTech Vídeos</Text>
          </View>
        </View>

        {/* Informações textuais do vídeo */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.summaryTeaser} numberOfLines={2}>
            {video.summary}
          </Text>

          <View style={styles.actionRow}>
            <Text style={styles.actionPrompt}>Toque para assistir e ver o resumo</Text>
            <Feather name="chevron-right" size={16} color={THEME.colors.primary} />
          </View>
        </View>
      </Card>
    </AccessiblePressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  card: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: THEME.colors.surfaceCard,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: THEME.dimensions.radius.lg,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  badgeTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(27, 94, 32, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: THEME.dimensions.radius.sm,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  durationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: THEME.dimensions.radius.sm,
  },
  durationIcon: {
    marginRight: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  playButtonCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  playButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  watermarkText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    fontWeight: '600',
  },
  infoContainer: {
    padding: THEME.dimensions.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
  },
  summaryTeaser: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  actionPrompt: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.primary,
  },
});
