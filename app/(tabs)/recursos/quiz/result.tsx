import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../../constants/theme';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { AccessiblePressable } from '../../../../components/common/AccessiblePressable';

export default function QuizResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    score?: string;
    total?: string;
    percentage?: string;
    category?: string;
    badgeTitle?: string;
    badgeIcon?: string;
  }>();

  const score = params.score ? parseInt(params.score, 10) : 0;
  const total = params.total ? parseInt(params.total, 10) : 5;
  const percentage = params.percentage ? parseInt(params.percentage, 10) : 0;
  const badgeTitle = params.badgeTitle || null;

  // Feedback rural personalizado
  let evaluationTitle = 'Bom Início na Roça!';
  let evaluationMessage =
    'Cada dúvida tirada no quiz é uma colheita mais forte no futuro. Revise os temas e tente novamente!';
  let trophyColor = '#FFA000';

  if (percentage >= 80) {
    evaluationTitle = 'Excelente Conhecimento Agronômico!';
    evaluationMessage =
      'Você demonstrou alto domínio das práticas de cultivo, manejo de pragas e derivados do caju no semiárido.';
    trophyColor = '#2E7D32';
  } else if (percentage >= 60) {
    evaluationTitle = 'Muito Bom Rendimento!';
    evaluationMessage =
      'Você conhece os princípios essenciais da cajucultura. Com mais algumas rodadas você se tornará um mestre!';
    trophyColor = '#1976D2';
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header com botão de voltar para Recursos (hitbox >= 48dp) */}
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
        <Text style={styles.headerTitle}>Resultado da Rodada</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Card Principal de Pontuação */}
      <Card style={styles.resultCard}>
        <View style={[styles.trophyCircle, { backgroundColor: `${trophyColor}1A` }]}>
          <Feather name="award" size={44} color={trophyColor} />
        </View>

        <Text style={styles.evaluationTitle}>{evaluationTitle}</Text>
        <Text style={styles.evaluationMessage}>{evaluationMessage}</Text>

        <View style={styles.scoreRow}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreNumber}>
              {score} / {total}
            </Text>
            <Text style={styles.scoreLabel}>Acertos</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.scoreItem}>
            <Text style={[styles.scoreNumber, { color: trophyColor }]}>
              {percentage}%
            </Text>
            <Text style={styles.scoreLabel}>Aproveitamento</Text>
          </View>
        </View>

        {badgeTitle && (
          <View style={styles.badgeContainer}>
            <Feather name="shield" size={18} color="#7B1FA2" />
            <Text style={styles.badgeText}>
              Medalha Conquistada: <Text style={styles.badgeHighlight}>{badgeTitle}</Text>
            </Text>
          </View>
        )}
      </Card>

      {/* Ações com botões de tamanho acessível (hitbox >= 48dp) */}
      <View style={styles.actionsContainer}>
        <Button
          label="Jogar Nova Rodada"
          onPress={() => router.push('/(tabs)/recursos/quiz' as any)}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Feather name="rotate-ccw" size={18} color="#FFFFFF" />}
        />

        <Button
          label="Voltar para Recursos Educativos"
          onPress={() => router.push('/(tabs)/recursos')}
          variant="outline"
          size="md"
          fullWidth
          icon={<Feather name="book-open" size={18} color={THEME.colors.primary} />}
        />
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
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: THEME.dimensions.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.dimensions.spacing.md,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.dimensions.radius.xl,
    padding: THEME.dimensions.spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    marginBottom: 20,
  },
  trophyCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  evaluationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  evaluationMessage: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 420,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#F9FBF7',
    borderRadius: THEME.dimensions.radius.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E8EFE3',
    marginBottom: 16,
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  scoreLabel: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: '#E0E0E0',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: THEME.dimensions.radius.full,
  },
  badgeText: {
    fontSize: 13,
    color: '#6A1B9A',
  },
  badgeHighlight: {
    fontWeight: '800',
  },
  actionsContainer: {
    gap: 12,
  },
});
