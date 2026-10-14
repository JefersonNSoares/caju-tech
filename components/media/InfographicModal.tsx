import React, { useState } from 'react';
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
import { AccessiblePressable } from '../common/AccessiblePressable';
import { Button } from '../common/Button';
import { MediaResource } from '../../types/media';

export interface InfographicModalProps {
  visible: boolean;
  infographic: MediaResource | null;
  onClose: () => void;
}

export const InfographicModal: React.FC<InfographicModalProps> = ({
  visible,
  infographic,
  onClose,
}) => {
  const { width } = useWindowDimensions();
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!infographic) return null;

  const isDesktop = Platform.OS === 'web' && width >= 768;
  const modalWidth = isDesktop ? 700 : Math.min(width - 32, 560);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleClose = () => {
    setZoomLevel(1);
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
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable
          style={[styles.modalContainer, { width: modalWidth }]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header com título e botão de fechar */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleGroup}>
              <View
                style={[
                  styles.badgeInfographic,
                  { backgroundColor: infographic.bannerColor || THEME.colors.primary },
                ]}
              >
                <Feather name="image" size={13} color="#FFFFFF" />
                <Text style={styles.badgeText}>Infográfico Agronômico</Text>
              </View>
              <Text style={styles.categoryLabel}>{infographic.categoryLabel}</Text>
            </View>

            <AccessiblePressable
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Fechar infográfico"
              minTouchSize={48}
            >
              <Feather name="x" size={24} color={THEME.colors.textPrimary} />
            </AccessiblePressable>
          </View>

          {/* Barra de Ferramentas de Zoom (hitbox >= 48dp) */}
          <View style={styles.zoomToolbar}>
            <Text style={styles.zoomLabel}>
              Zoom: {Math.round(zoomLevel * 100)}%
            </Text>

            <View style={styles.zoomActions}>
              <AccessiblePressable
                onPress={handleZoomOut}
                style={styles.zoomButton}
                accessibilityLabel="Diminuir zoom do infográfico"
                minTouchSize={48}
              >
                <Feather name="minus" size={18} color={THEME.colors.textPrimary} />
              </AccessiblePressable>

              <AccessiblePressable
                onPress={handleResetZoom}
                style={styles.zoomButton}
                accessibilityLabel="Redefinir tamanho padrão"
                minTouchSize={48}
              >
                <Feather name="rotate-ccw" size={16} color={THEME.colors.textPrimary} />
              </AccessiblePressable>

              <AccessiblePressable
                onPress={handleZoomIn}
                style={styles.zoomButton}
                accessibilityLabel="Aumentar zoom do infográfico"
                minTouchSize={48}
              >
                <Feather name="plus" size={18} color={THEME.colors.textPrimary} />
              </AccessiblePressable>
            </View>
          </View>

          {/* Conteúdo com rolagem e escala dinâmica */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={[
              styles.scrollContent,
              { transform: [{ scale: zoomLevel }] },
            ]}
            showsVerticalScrollIndicator
          >
            <Text style={styles.title}>{infographic.title}</Text>
            <Text style={styles.summary}>{infographic.summary}</Text>

            {/* Etapas Ilustradas do Infográfico */}
            {infographic.infographicSteps && infographic.infographicSteps.length > 0 && (
              <View style={styles.stepsContainer}>
                <Text style={styles.stepsSectionTitle}>Passo a Passo Técnico</Text>

                {infographic.infographicSteps.map((step) => (
                  <View key={step.stepNumber} style={styles.stepCard}>
                    <View style={styles.stepHeaderRow}>
                      <View style={styles.stepNumberCircle}>
                        <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                      </View>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                    </View>

                    <Text style={styles.stepDescription}>{step.description}</Text>

                    {step.criticalNotice && (
                      <View style={styles.warningBox}>
                        <Feather name="alert-triangle" size={16} color="#E65100" />
                        <Text style={styles.warningText}>{step.criticalNotice}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Destaques e Recomendações de Campo */}
            {infographic.infographicKeyHighlights && (
              <View style={styles.highlightsBox}>
                <View style={styles.highlightsHeader}>
                  <Feather name="check-circle" size={18} color={THEME.colors.primaryDark} />
                  <Text style={styles.highlightsTitle}>Destaques de Boas Práticas</Text>
                </View>

                {infographic.infographicKeyHighlights.map((hl, idx) => (
                  <View key={idx} style={styles.highlightItem}>
                    <Feather name="chevron-right" size={16} color={THEME.colors.primary} />
                    <Text style={styles.highlightItemText}>{hl}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.footerAction}>
              <Button
                label="Fechar Infográfico"
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
    flexWrap: 'wrap',
    flex: 1,
  },
  badgeInfographic: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  categoryLabel: {
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
  zoomToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.dimensions.spacing.md,
    paddingVertical: 6,
    backgroundColor: '#F1F8E9',
    borderBottomWidth: 1,
    borderBottomColor: '#DCEDC8',
  },
  zoomLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  zoomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  zoomButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C5E1A5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollArea: {
    flexGrow: 1,
  },
  scrollContent: {
    padding: THEME.dimensions.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
    lineHeight: 26,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  stepsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  stepsSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  stepCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: THEME.dimensions.radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  stepNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stepTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  stepDescription: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 19,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
    padding: 8,
    gap: 6,
    alignItems: 'center',
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FB8C00',
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#E65100',
    fontWeight: '600',
  },
  highlightsBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: THEME.dimensions.radius.md,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  highlightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  highlightsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginVertical: 4,
  },
  highlightItemText: {
    flex: 1,
    fontSize: 13,
    color: THEME.colors.textPrimary,
    lineHeight: 18,
  },
  footerAction: {
    marginTop: 8,
    marginBottom: 12,
  },
});
