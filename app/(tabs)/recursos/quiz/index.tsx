import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../../constants/theme';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { AccessiblePressable } from '../../../../components/common/AccessiblePressable';
import { Skeleton } from '../../../../components/feedback/Skeleton';
import { quizService, QUIZ_BADGES } from '../../../../services/quizService';
import { QuizCategory, QuizStats } from '../../../../types/quiz';

interface CategoryOption {
  id: QuizCategory;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  description: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 'todas',
    label: 'Desafio Geral',
    icon: 'compass',
    description: 'Mistura de perguntas sobre cultivo, pragas e produtos do caju.',
  },
  {
    id: 'manejo',
    label: 'Plantio e Poda',
    icon: 'scissors',
    description: 'Espaçamento, adubação orgânica e técnicas de poda de condução.',
  },
  {
    id: 'pragas',
    label: 'Pragas e Doenças',
    icon: 'shield',
    description: 'Broca-das-pontas, oídio, tripes e boas práticas de controle.',
  },
  {
    id: 'derivados',
    label: 'Cajuína e Derivados',
    icon: 'package',
    description: 'Aproveitamento integral, clarificação e fibra vegetal.',
  },
];

export default function QuizHomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('todas');
  const [questionCount, setQuestionCount] = useState<number>(5);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await quizService.getQuizStats();
      setStats(data);
    } catch {
      // Offline fallback seguro
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleStartQuiz = () => {
    router.push({
      pathname: '/(tabs)/recursos/quiz/round',
      params: {
        category: selectedCategory,
        count: questionCount.toString(),
      },
    } as any);
  };

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

        <View style={styles.headerTextGroup}>
          <Text style={styles.title}>Quiz do Produtor</Text>
          <Text style={styles.subtitle}>
            Aprenda na prática e teste seus saberes sobre a cajucultura no semiárido.
          </Text>
        </View>
      </View>

      {/* Zero Telas em Branco: Skeleton durante leitura do armazenamento local */}
      {loading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton height={100} borderRadius={12} style={{ marginBottom: 14 }} />
          <Skeleton height={140} borderRadius={12} style={{ marginBottom: 14 }} />
          <Skeleton height={50} borderRadius={10} />
        </View>
      ) : (
        <>
          {/* Card de Estatísticas e Conquistas Locais */}
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Feather name="check-circle" size={22} color={THEME.colors.primary} />
                <Text style={styles.statValue}>
                  {stats ? `${stats.bestPercentage}%` : '0%'}
                </Text>
                <Text style={styles.statLabel}>Melhor Nota</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Feather name="repeat" size={22} color="#0288D1" />
                <Text style={styles.statValue}>{stats?.totalRounds || 0}</Text>
                <Text style={styles.statLabel}>Rodadas</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Feather name="award" size={22} color="#F57C00" />
                <Text style={styles.statValue}>
                  {stats?.unlockedBadgeIds.length || 0} de {QUIZ_BADGES.length}
                </Text>
                <Text style={styles.statLabel}>Medalhas</Text>
              </View>
            </View>
          </Card>

          {/* Seleção do Tema da Rodada (hitbox >= 48dp) */}
          <Text style={styles.sectionTitle}>Escolha o Tema do Desafio</Text>
          <View style={styles.categoryGrid}>
            {CATEGORY_OPTIONS.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <AccessiblePressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.categoryCardSelected,
                  ]}
                  minTouchSize={48}
                  accessibilityRole="button"
                  accessibilityLabel={`Tema: ${cat.label}. ${cat.description}`}
                >
                  <View style={styles.catHeader}>
                    <View
                      style={[
                        styles.catIconCircle,
                        isSelected && styles.catIconCircleSelected,
                      ]}
                    >
                      <Feather
                        name={cat.icon}
                        size={20}
                        color={isSelected ? '#FFFFFF' : THEME.colors.primary}
                      />
                    </View>
                    <Text
                      style={[
                        styles.catTitle,
                        isSelected && styles.catTitleSelected,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </View>
                  <Text style={styles.catDesc}>{cat.description}</Text>
                </AccessiblePressable>
              );
            })}
          </View>

          {/* Quantidade de Questões (hitbox >= 48dp) */}
          <Text style={styles.sectionTitle}>Tamanho da Rodada</Text>
          <View style={styles.countSelectorRow}>
            {[5, 10].map((num) => {
              const isSelected = questionCount === num;
              return (
                <AccessiblePressable
                  key={num}
                  onPress={() => setQuestionCount(num)}
                  style={[
                    styles.countButton,
                    isSelected && styles.countButtonSelected,
                  ]}
                  minTouchSize={48}
                  accessibilityRole="button"
                  accessibilityLabel={`${num} questões`}
                >
                  <Text
                    style={[
                      styles.countButtonText,
                      isSelected && styles.countButtonTextSelected,
                    ]}
                  >
                    {num} Questões {num === 5 ? '(Rápido)' : '(Completo)'}
                  </Text>
                </AccessiblePressable>
              );
            })}
          </View>

          {/* Botão de Início com Hitbox Grande (minHeight: 52dp) */}
          <View style={styles.actionContainer}>
            <Button
              label="Iniciar Desafio no Campo"
              onPress={handleStartQuiz}
              variant="primary"
              size="lg"
              fullWidth
              icon={<Feather name="play" size={20} color="#FFFFFF" />}
            />
          </View>
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
  headerTextGroup: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  subtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },
  skeletonContainer: {
    gap: 12,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    padding: THEME.dimensions.spacing.md,
    borderRadius: THEME.dimensions.radius.lg,
    marginBottom: THEME.dimensions.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginTop: 8,
    marginBottom: 10,
  },
  categoryGrid: {
    gap: 10,
    marginBottom: 14,
  },
  categoryCard: {
    width: '100%',
    minHeight: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.dimensions.radius.md,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  categoryCardSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#F1F8E9',
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  catIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIconCircleSelected: {
    backgroundColor: THEME.colors.primary,
  },
  catTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  catTitleSelected: {
    color: THEME.colors.primaryDark,
  },
  catDesc: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 17,
    paddingLeft: 46,
  },
  countSelectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  countButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: THEME.dimensions.radius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  countButtonSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#E8F5E9',
  },
  countButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  countButtonTextSelected: {
    color: THEME.colors.primaryDark,
    fontWeight: '700',
  },
  actionContainer: {
    marginTop: 6,
  },
});
