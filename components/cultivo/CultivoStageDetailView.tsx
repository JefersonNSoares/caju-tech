import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { CultivoStageId, CultivoVideo } from '../../types/cultivo';
import { cultivoService } from '../../services/cultivoService';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from '../common/AccessiblePressable';
import { Card } from '../common/Card';
import { EmptyState } from '../feedback/EmptyState';
import { VideoCardPlaceholder } from '../media/VideoCardPlaceholder';
import { VideoPlayerModal } from '../media/VideoPlayerModal';

export interface CultivoStageDetailViewProps {
  stageId: CultivoStageId;
}

export const CultivoStageDetailView: React.FC<CultivoStageDetailViewProps> = ({
  stageId,
}) => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<CultivoVideo | null>(null);

  const stage = cultivoService.getStageById(stageId);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/cultivo' as any);
    }
  };

  if (!stage) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Fase não encontrada"
          description="A etapa do cultivo solicitada não está disponível."
          actionLabel="Voltar para Cultivo"
          onAction={handleBack}
          iconName="alert-circle"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      className="flex-1 bg-[#F9FBF7]"
    >
      <View className="w-full max-w-2xl mx-auto flex flex-col">
        {/* 1. Header com botão de voltar acessível (Hitbox >= 48dp) */}
        <View style={styles.headerBar}>
          <AccessiblePressable
            testID="btn-back-cultivo"
            onPress={handleBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Voltar para a lista de etapas de cultivo"
          >
            <Feather name="arrow-left" size={24} color={THEME.colors.primaryDark} />
          </AccessiblePressable>

          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{stage.badge}</Text>
          </View>
        </View>

        {/* 2. Título da Fase e Contexto Geral */}
        <Card style={styles.introCard}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <Feather name={stage.icon} size={24} color={THEME.colors.primary} />
            </View>
            <View style={styles.titleTextContainer}>
              <Text style={styles.screenTitle}>{stage.title}</Text>
              <Text style={styles.screenSubtitle}>{stage.subtitle}</Text>
            </View>
          </View>

          {/* Texto Explicativo Genérico no Topo */}
          <View style={styles.introTextContainer}>
            <Text style={styles.introText}>{stage.intro}</Text>
          </View>

          {/* Recomendações e Boas Práticas Agronômicas */}
          <View style={styles.orientacoesContainer}>
            <View style={styles.orientacoesHeader}>
              <Feather name="check-circle" size={16} color={THEME.colors.primary} />
              <Text style={styles.orientacoesTitle}>Orientações Agronômicas Práticas</Text>
            </View>

            <View style={styles.orientacoesList}>
              {stage.orientacoes.map((item, index) => (
                <View key={index} style={styles.orientacaoItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.orientacaoItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* 3. Área de Vídeos Educativos (Projetada para 2 vídeos) */}
        <View style={styles.videosSectionHeader} className="mt-6 mb-3">
          <View style={styles.videosTitleRow}>
            <Feather name="play-circle" size={20} color={THEME.colors.primary} />
            <Text style={styles.videosSectionTitle}>Vídeos Demonstrativos</Text>
          </View>
          <View style={styles.videosCountBadge}>
            <Text style={styles.videosCountText}>2 vídeos</Text>
          </View>
        </View>

        <Text style={styles.videosSectionSubtitle}>
          Assista às instruções práticas em campo para visualizar o procedimento correto.
        </Text>

        {/* Container abrigando os 2 vídeos com o componente de placeholder */}
        <View style={styles.videosContainer} className="flex flex-col gap-4 mt-2">
          {stage.videos.map((video) => (
            <VideoCardPlaceholder
              key={video.id}
              video={video}
              onPress={() => setSelectedVideo(video)}
            />
          ))}
        </View>
      </View>

      {/* Modal do Player com Vídeo Ampliado e Resumo Técnico Completo */}
      <VideoPlayerModal
        visible={Boolean(selectedVideo)}
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    padding: THEME.dimensions.spacing.md,
    paddingBottom: THEME.dimensions.spacing.xxl,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.dimensions.spacing.md,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  badgeContainer: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.dimensions.radius.md,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
    textTransform: 'uppercase',
  },
  introCard: {
    padding: THEME.dimensions.spacing.md,
    backgroundColor: THEME.colors.surfaceCard,
    borderRadius: THEME.dimensions.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleTextContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  screenSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  introTextContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  introText: {
    fontSize: 14,
    color: THEME.colors.textPrimary,
    lineHeight: 22,
  },
  orientacoesContainer: {
    marginTop: 12,
    backgroundColor: '#F5F9F4',
    borderRadius: THEME.dimensions.radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0EEDC',
  },
  orientacoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  orientacoesTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  orientacoesList: {
    gap: 8,
  },
  orientacaoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primary,
    marginTop: 6,
  },
  orientacaoItemText: {
    flex: 1,
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
  videosSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  videosTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  videosSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  videosCountBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  videosCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  videosSectionSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginBottom: 10,
  },
  videosContainer: {
    gap: 14,
  },
});
