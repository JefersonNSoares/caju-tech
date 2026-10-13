import React, { useState, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from './AccessiblePressable';
import { Button } from './Button';
import { YouTubePlayer } from './YouTubePlayer';

export interface VideoModalProps {
  visible: boolean;
  videoId: string | null | undefined;
  title: string;
  summary: string;
  duration?: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  videoId,
  title,
  summary,
  duration,
  onClose,
}) => {
  const { width } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleClose = () => {
    setPlaying(false);
    onClose();
  };

  if (!videoId) return null;

  const isDesktop = Platform.OS === 'web' && width >= 768;
  const modalWidth = isDesktop ? 680 : Math.min(width - 32, 540);
  // Aspect ratio 16:9 para o player
  const playerHeight = Math.round((modalWidth * 9) / 16);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      {/* Backdrop com fechamento ao clicar fora da área */}
      <Pressable style={styles.backdrop} onPress={handleClose}>
        {/* Container do modal: stopPropagation ao clicar no corpo do modal */}
        <Pressable
          style={[
            styles.modalContainer,
            { width: modalWidth },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header do Modal com título e botão de fechar "X" */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleGroup}>
              <View style={styles.badgeYouTube}>
                <Feather name="youtube" size={13} color="#FFFFFF" />
                <Text style={styles.badgeYouTubeText}>Vídeo Técnico</Text>
              </View>
              {Boolean(duration) && (
                <Text style={styles.headerDuration}>{duration}</Text>
              )}
            </View>

            <AccessiblePressable
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Fechar player de vídeo"
              minTouchSize={48}
            >
              <Feather name="x" size={24} color={THEME.colors.textPrimary} />
            </AccessiblePressable>
          </View>

          {/* Área do Player de Vídeo do YouTube */}
          <View style={[styles.playerContainer, { height: playerHeight }]}>
            <YouTubePlayer
              videoId={videoId}
              height={playerHeight}
              play={playing}
              title={title}
              onStateChange={onStateChange}
            />
          </View>

          {/* Área de Resumo Agronômico com rolagem e espaço ampliado */}
          <ScrollView
            style={styles.bodyScrollView}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.videoTitle}>{title}</Text>

            {/* Caixa de Resumo Agronômico com ScrollView interno dedicado */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeaderRow}>
                <Feather name="file-text" size={18} color={THEME.colors.primary} />
                <Text style={styles.summarySectionTitle}>Resumo Agronômico</Text>
              </View>

              <ScrollView
                style={styles.summaryScrollContainer}
                contentContainerStyle={styles.summaryScrollContent}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                <Text style={styles.summaryText}>{summary}</Text>
              </ScrollView>
            </View>

            {/* Aviso de contextualização para o Semiárido */}
            <View style={styles.tipBox}>
              <Feather name="check-circle" size={16} color={THEME.colors.primaryDark} />
              <Text style={styles.tipText}>
                Instruções e práticas técnicas aplicadas à cajucultura do semiárido piauiense e regional.
              </Text>
            </View>

            <View style={styles.actionContainer}>
              <Button
                label="Fechar Vídeo"
                onPress={handleClose}
                variant="primary"
                size="md"
                fullWidth
              />
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.dimensions.radius.xl,
    maxHeight: '94%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.dimensions.spacing.md,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeYouTube: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#C62828',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeYouTubeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  headerDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    width: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  bodyScrollView: {
    flexGrow: 1,
  },
  bodyContent: {
    padding: THEME.dimensions.spacing.md,
    paddingBottom: THEME.dimensions.spacing.md,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
    lineHeight: 24,
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#F9FBF7',
    borderRadius: THEME.dimensions.radius.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    marginBottom: 14,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  summarySectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  summaryScrollContainer: {
    maxHeight: 200,
    borderRadius: THEME.dimensions.radius.sm,
  },
  summaryScrollContent: {
    paddingVertical: 2,
    paddingRight: 4,
  },
  summaryText: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 23,
    fontWeight: '500',
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: THEME.dimensions.radius.md,
    padding: 12,
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: THEME.colors.primaryDark,
    lineHeight: 19,
    fontWeight: '500',
  },
  actionContainer: {
    paddingTop: 2,
  },
});
