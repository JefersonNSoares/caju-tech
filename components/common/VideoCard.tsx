import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from './AccessiblePressable';
import { Card } from './Card';

export interface VideoCardProps {
  videoId: string;
  title: string;
  duration: string;
  summary?: string;
  onPress: () => void;
  testID?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  videoId,
  title,
  duration,
  summary,
  onPress,
  testID,
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <AccessiblePressable
      testID={testID || `video-card-${videoId}`}
      onPress={onPress}
      style={styles.pressable}
      accessibilityRole="button"
      accessibilityLabel={`Assistir vídeo: ${title}. Duração: ${duration}. Toque para assistir`}
    >
      <Card style={styles.card}>
        {/* Container da Thumbnail do YouTube (16:9) */}
        <View style={styles.thumbnailWrapper}>
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
            accessibilityLabel={`Miniatura do vídeo ${title}`}
          />
          <View style={styles.darkOverlay} />

          {/* Duração no canto superior direito */}
          <View style={styles.durationBadge}>
            <Feather name="clock" size={12} color="#FFFFFF" style={styles.durationIcon} />
            <Text style={styles.durationText}>{duration}</Text>
          </View>

          {/* Ícone de Play centralizado */}
          <View style={styles.playCircleOuter}>
            <View style={styles.playCircleInner}>
              <Feather name="play" size={24} color="#FFFFFF" style={{ marginLeft: 3 }} />
            </View>
          </View>

          {/* Tag de identificação técnica */}
          <View style={styles.badgeYouTube}>
            <Feather name="youtube" size={13} color="#FFFFFF" />
            <Text style={styles.badgeYouTubeText}>CajuTech Vídeos</Text>
          </View>
        </View>

        {/* Informações textuais */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          {Boolean(summary) && (
            <Text style={styles.summaryText} numberOfLines={2}>
              {summary}
            </Text>
          )}

          <View style={styles.actionRow}>
            <View style={styles.actionPromptRow}>
              <Feather name="play-circle" size={14} color={THEME.colors.primary} />
              <Text style={styles.actionPrompt}>Toque para assistir</Text>
            </View>
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
    minHeight: 48,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: THEME.colors.surfaceCard,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: THEME.dimensions.radius.lg,
  },
  thumbnailWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    backgroundColor: '#0E3A13',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  durationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
  playCircleOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  playCircleInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeYouTube: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeYouTubeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  summaryText: {
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
  actionPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionPrompt: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
});
