import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';
import { Skeleton } from '../../../components/feedback/Skeleton';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { VideoCard } from '../../../components/common/VideoCard';
import { VideoModal } from '../../../components/common/VideoModal';
import { InfographicModal } from '../../../components/media/InfographicModal';
import { mediaService } from '../../../services/mediaService';
import { MediaResource, MediaType } from '../../../types/media';

type FilterType = 'todos' | MediaType;

const FILTER_TABS: { id: FilterType; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { id: 'todos', label: 'Todos os Recursos', icon: 'grid' },
  { id: 'video', label: 'Vídeos Práticos', icon: 'video' },
  { id: 'infografico', label: 'Infográficos', icon: 'image' },
];

export default function MidiasScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MediaResource[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Modais de exibição
  const [selectedVideo, setSelectedVideo] = useState<MediaResource | null>(null);
  const [selectedInfographic, setSelectedInfographic] = useState<MediaResource | null>(null);

  const loadMedia = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mediaService.getMediaItems(
        activeFilter,
        'todos',
        searchQuery
      );
      setItems(data);
    } catch {
      // Offline fallback
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

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
          <Text style={styles.headerTitle}>Vídeos e Infográficos</Text>
          <Text style={styles.headerSubtitle}>
            Catálogo multimídia de aulas de campo e esquemas visuais
          </Text>
        </View>
      </View>

      {/* Barra de Pesquisa por Palavra-Chave */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color={THEME.colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar por enxertia, cajuína, poda..."
          placeholderTextColor={THEME.colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Pesquisar vídeos e infográficos"
        />
        {searchQuery.length > 0 && (
          <AccessiblePressable
            onPress={() => setSearchQuery('')}
            style={styles.clearSearchButton}
            minTouchSize={48}
            accessibilityLabel="Limpar busca"
          >
            <Feather name="x" size={18} color={THEME.colors.textMuted} />
          </AccessiblePressable>
        )}
      </View>

      {/* Abas de Filtro Unificado (Hitbox >= 48dp) */}
      <View style={styles.filterTabsRow}>
        {FILTER_TABS.map((tab) => {
          const isSelected = activeFilter === tab.id;
          return (
            <AccessiblePressable
              key={tab.id}
              onPress={() => setActiveFilter(tab.id)}
              style={[
                styles.filterTabButton,
                isSelected && styles.filterTabButtonSelected,
              ]}
              minTouchSize={48}
              accessibilityRole="tab"
              accessibilityState={isSelected ? { selected: true } : {}}
              accessibilityLabel={`Filtro: ${tab.label}`}
            >
              <Feather
                name={tab.icon}
                size={16}
                color={isSelected ? '#FFFFFF' : THEME.colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterTabText,
                  isSelected && styles.filterTabTextSelected,
                ]}
              >
                {tab.label}
              </Text>
            </AccessiblePressable>
          );
        })}
      </View>

      {/* Zero Telas em Branco: Skeleton durante carregamento */}
      {loading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton height={180} borderRadius={12} style={{ marginBottom: 14 }} />
          <Skeleton height={180} borderRadius={12} style={{ marginBottom: 14 }} />
          <Skeleton height={180} borderRadius={12} />
        </View>
      ) : items.length === 0 ? (
        <EmptyState
          title="Nenhum material no cesto"
          description="Não encontramos nenhum vídeo ou infográfico para a busca realizada. Experimente outro termo."
          actionLabel="Limpar Filtros"
          onAction={() => {
            setActiveFilter('todos');
            setSearchQuery('');
          }}
          iconName="inbox"
        />
      ) : (
        <View style={styles.itemsList}>
          {items.map((item) => {
            if (item.type === 'video') {
              return (
                <View key={item.id} style={styles.itemWrapper}>
                  <VideoCard
                    videoId={item.youtubeId || ''}
                    title={item.title}
                    duration={item.duration || '05:00 min'}
                    summary={item.summary}
                    onPress={() => setSelectedVideo(item)}
                  />
                </View>
              );
            }

            // Card de Infográfico
            return (
              <AccessiblePressable
                key={item.id}
                onPress={() => setSelectedInfographic(item)}
                style={styles.infographicPressable}
                minTouchSize={48}
                accessibilityRole="button"
                accessibilityLabel={`Infográfico: ${item.title}. Toque para abrir`}
              >
                <Card style={styles.infographicCard}>
                  <View style={styles.infographicHeaderRow}>
                    <View
                      style={[
                        styles.infographicBadge,
                        { backgroundColor: item.bannerColor || THEME.colors.primary },
                      ]}
                    >
                      <Feather name="image" size={13} color="#FFFFFF" />
                      <Text style={styles.infographicBadgeText}>{item.tag}</Text>
                    </View>

                    <Text style={styles.categoryLabelText}>{item.categoryLabel}</Text>
                  </View>

                  <Text style={styles.infographicTitle}>{item.title}</Text>
                  <Text style={styles.infographicSummary}>{item.summary}</Text>

                  <View style={styles.infographicFooterRow}>
                    <View style={styles.stepsBadge}>
                      <Feather name="list" size={14} color={THEME.colors.primary} />
                      <Text style={styles.stepsBadgeText}>
                        {item.infographicSteps?.length || 0} Passos Ilustrados
                      </Text>
                    </View>

                    <View style={styles.zoomPrompt}>
                      <Text style={styles.zoomPromptText}>Abrir com Zoom</Text>
                      <Feather name="maximize-2" size={14} color={THEME.colors.primary} />
                    </View>
                  </View>
                </Card>
              </AccessiblePressable>
            );
          })}
        </View>
      )}

      {/* Modal de Vídeo */}
      <VideoModal
        visible={Boolean(selectedVideo)}
        videoId={selectedVideo?.youtubeId || ''}
        title={selectedVideo?.title || ''}
        summary={selectedVideo?.summary || ''}
        duration={selectedVideo?.duration}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Modal de Infográfico com Zoom */}
      <InfographicModal
        visible={Boolean(selectedInfographic)}
        infographic={selectedInfographic}
        onClose={() => setSelectedInfographic(null)}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.dimensions.radius.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    minHeight: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: THEME.colors.textPrimary,
  },
  clearSearchButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  filterTabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: THEME.dimensions.radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  filterTabButtonSelected: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  filterTabTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  skeletonContainer: {
    gap: 14,
  },
  itemsList: {
    gap: 16,
  },
  itemWrapper: {
    width: '100%',
  },
  infographicPressable: {
    width: '100%',
    minHeight: 48,
  },
  infographicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  infographicHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infographicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  infographicBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  categoryLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  infographicTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  infographicSummary: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  infographicFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  stepsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stepsBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.primaryDark,
  },
  zoomPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  zoomPromptText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
});
