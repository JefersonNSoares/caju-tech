import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CultivoVideo } from '../../types/cultivo';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from '../common/AccessiblePressable';
import { Button } from '../common/Button';

export interface VideoPlayerModalProps {
  visible: boolean;
  video: CultivoVideo | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  visible,
  video,
  onClose,
}) => {
  const { width } = useWindowDimensions();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) return null;

  const isDesktop = Platform.OS === 'web' && width >= 768;

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleClose = () => {
    setIsPlaying(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        {/* Container do modal centralizado e com largura máxima responsiva */}
        <View
          style={[
            styles.modalContainer,
            { maxWidth: isDesktop ? 680 : '95%', width: '100%' },
          ]}
        >
          {/* Header do Modal com título e botão de fechar acessível */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleContainer}>
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>{video.badge}</Text>
              </View>
              <Text style={styles.headerDuration}>{video.duration}</Text>
            </View>

            <AccessiblePressable
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Fechar player de vídeo"
            >
              <Feather name="x" size={24} color={THEME.colors.textPrimary} />
            </AccessiblePressable>
          </View>

          {/* Área do Player de Vídeo em 16:9 */}
          <View style={styles.playerContainer}>
            <View style={styles.videoScreen}>
              {/* Overlay / Simulação de exibição de vídeo */}
              <View style={styles.videoGradientOverlay} />

              {/* Botão de play/pause no centro do player */}
              <AccessiblePressable
                onPress={handleTogglePlay}
                style={styles.centerPlayButton}
                accessibilityRole="button"
                accessibilityLabel={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
              >
                <Feather
                  name={isPlaying ? 'pause' : 'play'}
                  size={32}
                  color="#FFFFFF"
                  style={!isPlaying ? { marginLeft: 4 } : {}}
                />
              </AccessiblePressable>

              {/* Status de reprodução */}
              <View style={styles.playStatusBadge}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: isPlaying ? '#4CAF50' : '#FF9800' },
                  ]}
                />
                <Text style={styles.playStatusText}>
                  {isPlaying ? 'Em reprodução (Simulado)' : 'Pausado'}
                </Text>
              </View>

              {/* Barra de controle inferior do player */}
              <View style={styles.playerControlsBar}>
                <AccessiblePressable
                  onPress={handleTogglePlay}
                  style={styles.miniControlButton}
                  accessibilityRole="button"
                  accessibilityLabel={isPlaying ? 'Pausar' : 'Play'}
                >
                  <Feather
                    name={isPlaying ? 'pause' : 'play'}
                    size={16}
                    color="#FFFFFF"
                  />
                </AccessiblePressable>

                {/* Linha de progresso */}
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: isPlaying ? '55%' : '20%' },
                    ]}
                  />
                </View>

                <Text style={styles.timeCounter}>
                  {isPlaying ? '02:15' : '00:00'} / {video.duration}
                </Text>

                <Feather
                  name="volume-2"
                  size={16}
                  color="#FFFFFF"
                  style={{ marginLeft: 8 }}
                />
                <Feather
                  name="maximize"
                  size={16}
                  color="#FFFFFF"
                  style={{ marginLeft: 10 }}
                />
              </View>
            </View>
          </View>

          {/* Descrição e Resumo Técnico com rolagem segura */}
          <ScrollView
            style={styles.bodyScrollView}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator
          >
            <Text style={styles.videoTitle}>{video.title}</Text>

            <View style={styles.summaryCard}>
              <View style={styles.summaryHeaderRow}>
                <Feather name="file-text" size={18} color={THEME.colors.primary} />
                <Text style={styles.summarySectionTitle}>Resumo Agronômico do Vídeo</Text>
              </View>
              <Text style={styles.summaryText}>{video.summary}</Text>
            </View>

            <View style={styles.tipBox}>
              <Feather name="info" size={16} color={THEME.colors.primaryDark} />
              <Text style={styles.tipText}>
                As orientações apresentadas foram validadas para a cultura do cajueiro-anão
                precoce sob condições edafoclimáticas do semiárido piauiense.
              </Text>
            </View>

            <View style={styles.actionContainer}>
              <Button
                label="Fechar e Voltar ao Cultivo"
                onPress={handleClose}
                variant="primary"
                size="md"
              />
            </View>
          </ScrollView>
        </View>
      </View>
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
    maxHeight: '92%',
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgePill: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: THEME.colors.primary,
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
  },
  videoScreen: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#111827',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  centerPlayButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  playStatusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  playStatusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  playerControlsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  miniControlButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME.colors.primaryLight,
  },
  timeCounter: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
  },
  bodyScrollView: {
    flexGrow: 0,
  },
  bodyContent: {
    padding: THEME.dimensions.spacing.md,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    lineHeight: 24,
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#F9FBF7',
    borderRadius: THEME.dimensions.radius.md,
    padding: THEME.dimensions.spacing.md,
    borderWidth: 1,
    borderColor: '#E0E7D8',
    marginBottom: 12,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  summarySectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  summaryText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 20,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: THEME.dimensions.radius.md,
    padding: 10,
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: THEME.colors.primaryDark,
    lineHeight: 18,
  },
  actionContainer: {
    paddingTop: 4,
  },
});
