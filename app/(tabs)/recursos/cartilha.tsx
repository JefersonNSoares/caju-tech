import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';
import { Skeleton } from '../../../components/feedback/Skeleton';
import { cartilhaService } from '../../../services/cartilhaService';
import { CartilhaChapter, CartilhaMetadata } from '../../../types/cartilha';

export default function CartilhaScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState<CartilhaMetadata | null>(null);
  const [chapters, setChapters] = useState<CartilhaChapter[]>([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isSavedOffline, setIsSavedOffline] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fontScale, setFontScale] = useState<number>(1);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [meta, chs, offline] = await Promise.all([
        cartilhaService.getMetadata(),
        cartilhaService.getChapters(),
        cartilhaService.isOfflineSaved(),
      ]);
      setMetadata(meta);
      setChapters(chs);
      setIsSavedOffline(offline);
    } catch {
      // Falha não impede renderização local
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleOffline = async () => {
    setIsSaving(true);
    const updated = await cartilhaService.toggleOfflineDownload();
    setIsSavedOffline(updated);
    setIsSaving(false);
  };

  const handleIncreaseFont = () => {
    setFontScale((prev) => Math.min(prev + 0.15, 1.45));
  };

  const handleDecreaseFont = () => {
    setFontScale((prev) => Math.max(prev - 0.15, 0.85));
  };

  const activeChapter: CartilhaChapter | undefined = chapters[activeChapterIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header com botão de voltar acessível (hitbox >= 48dp) */}
      <View style={styles.header}>
        <AccessiblePressable
          onPress={() => router.push('/(tabs)/recursos')}
          style={styles.backButton}
          minTouchSize={48}
          accessibilityRole="button"
          accessibilityLabel="Voltar para Recursos"
        >
          <Feather name="arrow-left" size={24} color={THEME.colors.primaryDark} />
        </AccessiblePressable>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>Cartilha Técnica Digital</Text>
          <Text style={styles.headerSubtitle}>
            Manual ilustrado de manejo sustentável da cajucultura
          </Text>
        </View>
      </View>

      {/* Zero Telas em Branco: Skeleton durante carregamento */}
      {loading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton height={90} borderRadius={12} style={{ marginBottom: 12 }} />
          <Skeleton height={50} borderRadius={8} style={{ marginBottom: 14 }} />
          <Skeleton height={200} borderRadius={12} style={{ marginBottom: 12 }} />
          <Skeleton height={140} borderRadius={12} />
        </View>
      ) : (
        <>
          {/* Card de Metadados e Ação Offline (AsyncStorage) */}
          <Card style={styles.metadataCard}>
            <View style={styles.metadataTopRow}>
              <View style={styles.metadataBadge}>
                <Feather name="book" size={14} color={THEME.colors.primaryDark} />
                <Text style={styles.metadataBadgeText}>
                  {metadata?.version || 'Edição 2.0'}
                </Text>
              </View>

              <View
                style={[
                  styles.offlineBadge,
                  isSavedOffline && styles.offlineBadgeSaved,
                ]}
              >
                <Feather
                  name={isSavedOffline ? 'check-circle' : 'hard-drive'}
                  size={14}
                  color={isSavedOffline ? '#2E7D32' : THEME.colors.textSecondary}
                />
                <Text
                  style={[
                    styles.offlineBadgeText,
                    isSavedOffline && styles.offlineBadgeTextSaved,
                  ]}
                >
                  {isSavedOffline
                    ? 'Disponível Offline no Celular'
                    : 'Armazenamento Padrão'}
                </Text>
              </View>
            </View>

            <Text style={styles.metadataTitle}>
              {metadata?.title || 'Manual da Cajucultura no Semiárido'}
            </Text>
            <Text style={styles.metadataRegion}>
              Região de aplicação: {metadata?.region || 'Semiárido Piauiense'}
            </Text>

            {/* Botão de Persistência Offline (hitbox >= 48dp) */}
            <View style={styles.offlineActionRow}>
              <Button
                label={
                  isSavedOffline
                    ? 'Remover do Cache Offline'
                    : 'Garantir Disponibilidade 100% Offline'
                }
                onPress={handleToggleOffline}
                loading={isSaving}
                variant={isSavedOffline ? 'outline' : 'primary'}
                size="md"
                fullWidth
                icon={
                  <Feather
                    name={isSavedOffline ? 'trash-2' : 'download-cloud'}
                    size={18}
                    color={isSavedOffline ? THEME.colors.primary : '#FFFFFF'}
                  />
                }
              />
            </View>
          </Card>

          {/* Barra de Ajuste de Leitura (Hitbox >= 48dp nos botões de zoom) */}
          <View style={styles.readerControlsBar}>
            <Text style={styles.readerControlsLabel}>
              Capítulo {activeChapterIndex + 1} de {chapters.length}
            </Text>

            <View style={styles.fontSizeControls}>
              <AccessiblePressable
                onPress={handleDecreaseFont}
                style={styles.fontButton}
                accessibilityRole="button"
                accessibilityLabel="Diminuir tamanho da letra"
                minTouchSize={48}
              >
                <Text style={styles.fontButtonText}>A-</Text>
              </AccessiblePressable>

              <AccessiblePressable
                onPress={handleIncreaseFont}
                style={styles.fontButton}
                accessibilityRole="button"
                accessibilityLabel="Aumentar tamanho da letra"
                minTouchSize={48}
              >
                <Text style={styles.fontButtonText}>A+</Text>
              </AccessiblePressable>
            </View>
          </View>

          {/* Abas Horizontais dos Capítulos (Hitbox >= 48dp) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chapterScroll}
            contentContainerStyle={styles.chapterScrollContent}
          >
            {chapters.map((ch, idx) => {
              const isSelected = activeChapterIndex === idx;
              return (
                <AccessiblePressable
                  key={ch.id}
                  onPress={() => setActiveChapterIndex(idx)}
                  style={[
                    styles.chapterTabButton,
                    isSelected && styles.chapterTabButtonSelected,
                  ]}
                  minTouchSize={48}
                  accessibilityRole="tab"
                  accessibilityState={isSelected ? { selected: true } : {}}
                  accessibilityLabel={`Capítulo ${ch.number}: ${ch.title}`}
                >
                  <Text
                    style={[
                      styles.chapterTabNumber,
                      isSelected && styles.chapterTabNumberSelected,
                    ]}
                  >
                    Cap. {ch.number}
                  </Text>
                  <Text
                    style={[
                      styles.chapterTabTitle,
                      isSelected && styles.chapterTabTitleSelected,
                    ]}
                    numberOfLines={1}
                  >
                    {ch.title.split(' ')[0]}...
                  </Text>
                </AccessiblePressable>
              );
            })}
          </ScrollView>

          {/* Conteúdo do Capítulo Ativo */}
          {activeChapter && (
            <Card style={styles.chapterCard}>
              <View style={styles.chapterHeader}>
                <View style={styles.chapterNumberBadge}>
                  <Text style={styles.chapterNumberBadgeText}>
                    Capítulo {activeChapter.number}
                  </Text>
                </View>

                <View style={styles.readingTimeBadge}>
                  <Feather name="clock" size={13} color={THEME.colors.textSecondary} />
                  <Text style={styles.readingTimeText}>
                    ~{activeChapter.readingTimeMinutes} min de leitura
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.chapterMainTitle,
                  { fontSize: 20 * fontScale, lineHeight: 26 * fontScale },
                ]}
              >
                {activeChapter.title}
              </Text>
              <Text
                style={[
                  styles.chapterSubtitle,
                  { fontSize: 14 * fontScale, lineHeight: 20 * fontScale },
                ]}
              >
                {activeChapter.subtitle}
              </Text>

              <View style={styles.summaryBox}>
                <Feather name="bookmark" size={16} color={THEME.colors.primary} />
                <Text
                  style={[
                    styles.summaryText,
                    { fontSize: 13 * fontScale, lineHeight: 19 * fontScale },
                  ]}
                >
                  {activeChapter.summary}
                </Text>
              </View>

              {/* Subseções Técnicas e Alertas de Campo */}
              <View style={styles.subsectionsList}>
                {activeChapter.subsections.map((sub, sIdx) => (
                  <View key={sIdx} style={styles.subsectionItem}>
                    <Text
                      style={[
                        styles.subsectionTitle,
                        { fontSize: 16 * fontScale, lineHeight: 22 * fontScale },
                      ]}
                    >
                      {sub.title}
                    </Text>

                    <Text
                      style={[
                        styles.subsectionContent,
                        { fontSize: 14 * fontScale, lineHeight: 22 * fontScale },
                      ]}
                    >
                      {sub.content}
                    </Text>

                    {/* Dicas em Destaque */}
                    {sub.highlightTips && sub.highlightTips.length > 0 && (
                      <View style={styles.highlightsContainer}>
                        {sub.highlightTips.map((tip, tIdx) => (
                          <View key={tIdx} style={styles.tipRow}>
                            <Feather name="check" size={16} color={THEME.colors.primary} />
                            <Text
                              style={[
                                styles.tipText,
                                { fontSize: 13 * fontScale, lineHeight: 18 * fontScale },
                              ]}
                            >
                              {tip}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Aviso de Alerta / Cuidado Crítico */}
                    {sub.fieldWarning && (
                      <View style={styles.warningContainer}>
                        <Feather name="alert-triangle" size={16} color="#E65100" />
                        <Text
                          style={[
                            styles.warningText,
                            { fontSize: 13 * fontScale, lineHeight: 18 * fontScale },
                          ]}
                        >
                          {sub.fieldWarning}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>

              {/* Navegação Entre Capítulos (hitbox >= 48dp) */}
              <View style={styles.chapterNavigationRow}>
                {activeChapterIndex > 0 ? (
                  <Button
                    label="Capítulo Anterior"
                    onPress={() => setActiveChapterIndex((prev) => prev - 1)}
                    variant="outline"
                    size="md"
                    icon={<Feather name="chevron-left" size={18} color={THEME.colors.primary} />}
                  />
                ) : (
                  <View style={{ flex: 1 }} />
                )}

                {activeChapterIndex < chapters.length - 1 ? (
                  <Button
                    label="Próximo Capítulo"
                    onPress={() => setActiveChapterIndex((prev) => prev + 1)}
                    variant="primary"
                    size="md"
                    icon={<Feather name="chevron-right" size={18} color="#FFFFFF" />}
                  />
                ) : (
                  <Button
                    label="Voltar ao Início"
                    onPress={() => setActiveChapterIndex(0)}
                    variant="secondary"
                    size="md"
                  />
                )}
              </View>
            </Card>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    padding: THEME.dimensions.spacing.md,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: THEME.dimensions.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.dimensions.spacing.md,
    gap: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  headerSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  skeletonContainer: {
    gap: 12,
  },
  metadataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  metadataTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 6,
  },
  metadataBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  metadataBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  offlineBadgeSaved: {
    backgroundColor: '#E8F5E9',
  },
  offlineBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  offlineBadgeTextSaved: {
    color: '#2E7D32',
    fontWeight: '700',
  },
  metadataTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    marginBottom: 2,
  },
  metadataRegion: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginBottom: 12,
  },
  offlineActionRow: {
    marginTop: 2,
  },
  readerControlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.dimensions.radius.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DCEDC8',
  },
  readerControlsLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fontButton: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C5E1A5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  chapterScroll: {
    marginBottom: 12,
  },
  chapterScrollContent: {
    gap: 8,
    paddingVertical: 4,
  },
  chapterTabButton: {
    minHeight: 48,
    minWidth: 90,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.dimensions.radius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterTabButtonSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#E8F5E9',
  },
  chapterTabNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  chapterTabNumberSelected: {
    color: THEME.colors.primaryDark,
  },
  chapterTabTitle: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  chapterTabTitleSelected: {
    color: THEME.colors.primaryDark,
    fontWeight: '600',
  },
  chapterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chapterNumberBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.dimensions.radius.full,
  },
  chapterNumberBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  readingTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readingTimeText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  chapterMainTitle: {
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  chapterSubtitle: {
    color: THEME.colors.textSecondary,
    marginBottom: 12,
  },
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: '#F9FBF7',
    borderRadius: THEME.dimensions.radius.md,
    padding: 12,
    gap: 8,
    borderLeftWidth: 4,
    borderLeftColor: THEME.colors.primary,
    marginBottom: 16,
  },
  summaryText: {
    flex: 1,
    color: THEME.colors.textPrimary,
    fontStyle: 'italic',
  },
  subsectionsList: {
    gap: 16,
    marginBottom: 20,
  },
  subsectionItem: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  subsectionTitle: {
    fontWeight: '700',
    color: THEME.colors.primaryDark,
    marginBottom: 6,
  },
  subsectionContent: {
    color: '#263238',
    marginBottom: 10,
  },
  highlightsContainer: {
    backgroundColor: '#F1F8E9',
    borderRadius: 8,
    padding: 10,
    gap: 6,
    marginBottom: 8,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  tipText: {
    flex: 1,
    color: THEME.colors.primaryDark,
    fontWeight: '500',
  },
  warningContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 10,
    gap: 8,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#FB8C00',
  },
  warningText: {
    flex: 1,
    color: '#E65100',
    fontWeight: '600',
  },
  chapterNavigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
});
