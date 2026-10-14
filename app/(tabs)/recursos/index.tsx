import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';
import { Skeleton } from '../../../components/feedback/Skeleton';
import { cartilhaService } from '../../../services/cartilhaService';
import { quizService } from '../../../services/quizService';
import { QuizStats } from '../../../types/quiz';

interface EducationalResourceItem {
  id: 'quiz' | 'cartilha' | 'midias';
  route: string;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  tag: string;
  badgeBg: string;
  badgeColor: string;
  iconBg: string;
}

const EDUCATIONAL_RESOURCES: EducationalResourceItem[] = [
  {
    id: 'quiz',
    route: '/(tabs)/recursos/quiz',
    title: 'Quiz do Produtor e Estudante',
    description: 'Teste seus conhecimentos em manejo, pragas e derivados com feedback imediato.',
    icon: 'help-circle',
    tag: 'Desafio Interativo',
    badgeBg: '#F3E5F5',
    badgeColor: '#7B1FA2',
    iconBg: '#EDE7F6',
  },
  {
    id: 'cartilha',
    route: '/(tabs)/recursos/cartilha',
    title: 'Cartilha Técnica Digital',
    description: 'Manual completo em 6 capítulos ilustrados sobre cajucultura no semiárido.',
    icon: 'book',
    tag: '100% Offline',
    badgeBg: '#E8F5E9',
    badgeColor: '#2E7D32',
    iconBg: '#E8F5E9',
  },
  {
    id: 'midias',
    route: '/(tabs)/recursos/midias',
    title: 'Vídeos e Infográficos Práticos',
    description: 'Aulas sobre enxertia, colheita e fluxogramas passo a passo da agroindústria.',
    icon: 'video',
    tag: 'Vídeos & Infográficos',
    badgeBg: '#FFF3E0',
    badgeColor: '#E65100',
    iconBg: '#FFF3E0',
  },
];

export default function RecursosScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isCartilhaOffline, setIsCartilhaOffline] = useState(false);
  const [quizStats, setQuizStats] = useState<QuizStats | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [offlineStatus, stats] = await Promise.all([
        cartilhaService.isOfflineSaved(),
        quizService.getQuizStats(),
      ]);
      setIsCartilhaOffline(offlineStatus);
      setQuizStats(stats);
    } catch {
      // Falha não bloqueia a UI
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.badgeHeader}>
          <Feather name="book-open" size={14} color={THEME.colors.primaryDark} />
          <Text style={styles.badgeHeaderText}>Formação Rural & Extensão</Text>
        </View>
        <Text style={styles.title}>Recursos Educativos</Text>
        <Text style={styles.subtitle}>
          Materiais práticos e dinâmicos para capacitação de agricultores, estudantes e técnicos no campo.
        </Text>
      </View>

      {/* Zero Telas em Branco: Skeleton durante carregamento inicial */}
      {loading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton height={110} borderRadius={12} style={{ marginBottom: 12 }} />
          <Skeleton height={110} borderRadius={12} style={{ marginBottom: 12 }} />
          <Skeleton height={110} borderRadius={12} />
        </View>
      ) : (
        <View style={styles.list}>
          {EDUCATIONAL_RESOURCES.map((res) => {
            // Detalhes dinâmicos de status
            let extraBadge: string | null = null;
            if (res.id === 'cartilha' && isCartilhaOffline) {
              extraBadge = 'Disponível no Armazenamento Local';
            } else if (res.id === 'quiz' && quizStats && quizStats.totalRounds > 0) {
              extraBadge = `Melhor pontuação: ${quizStats.bestPercentage}%`;
            }

            return (
              <AccessiblePressable
                key={res.id}
                onPress={() => router.push(res.route as any)}
                style={styles.pressableItem}
                minTouchSize={48}
                accessibilityRole="button"
                accessibilityLabel={`Recurso: ${res.title}. ${res.description}`}
                testID={`recurso-item-${res.id}`}
              >
                <Card style={styles.card}>
                  <View style={styles.topRow}>
                    <View style={[styles.badgeRow, { backgroundColor: res.badgeBg }]}>
                      <Text style={[styles.badgeText, { color: res.badgeColor }]}>{res.tag}</Text>
                    </View>

                    {extraBadge && (
                      <View style={styles.extraBadgeRow}>
                        <Feather name="check" size={12} color={THEME.colors.primaryDark} />
                        <Text style={styles.extraBadgeText}>{extraBadge}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.mainRow}>
                    <View style={[styles.iconContainer, { backgroundColor: res.iconBg }]}>
                      <Feather name={res.icon} size={22} color={res.badgeColor} />
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.itemTitle}>{res.title}</Text>
                      <Text style={styles.itemDescription}>{res.description}</Text>
                    </View>

                    <View style={styles.arrowCircle}>
                      <Feather name="chevron-right" size={20} color={THEME.colors.primary} />
                    </View>
                  </View>
                </Card>
              </AccessiblePressable>
            );
          })}
        </View>
      )}

      {/* Dica de usabilidade no campo */}
      <View style={styles.fieldHintBox}>
        <Feather name="wifi-off" size={16} color={THEME.colors.primaryDark} />
        <Text style={styles.fieldHintText}>
          Todos os conteúdos do Quiz, Cartilha e Infográficos funcionam mesmo sem sinal de internet na roça.
        </Text>
      </View>
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
  },
  header: {
    marginBottom: THEME.dimensions.spacing.md,
  },
  badgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.dimensions.radius.full,
    marginBottom: 8,
  },
  badgeHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  subtitle: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  skeletonContainer: {
    gap: 12,
  },
  list: {
    gap: 14,
  },
  pressableItem: {
    width: '100%',
    minHeight: 48,
  },
  card: {
    padding: THEME.dimensions.spacing.md,
    backgroundColor: THEME.colors.surfaceCard,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.07)',
    borderRadius: THEME.dimensions.radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 6,
  },
  badgeRow: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  extraBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  extraBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.primaryDark,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  fieldHintBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: THEME.dimensions.radius.md,
    padding: 12,
    gap: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  fieldHintText: {
    flex: 1,
    fontSize: 13,
    color: THEME.colors.primaryDark,
    lineHeight: 18,
    fontWeight: '500',
  },
});
