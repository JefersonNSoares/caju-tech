import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../../constants/theme';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { AccessiblePressable } from '../../../../components/common/AccessiblePressable';
import { Skeleton } from '../../../../components/feedback/Skeleton';
import { ErrorCard } from '../../../../components/feedback/ErrorCard';
import { QuizOptionButton } from '../../../../components/quiz/QuizOptionButton';
import { QuizProgressBar } from '../../../../components/quiz/QuizProgressBar';
import { quizService } from '../../../../services/quizService';
import { QuizQuestion, QuizCategory } from '../../../../types/quiz';

export default function QuizRoundScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; count?: string }>();

  const category = (params.category as QuizCategory) || 'todas';
  const count = params.count ? parseInt(params.count, 10) : 5;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const list = await quizService.getQuestions(category, count);
      if (list.length === 0) {
        setError(true);
      } else {
        setQuestions(list);
        setCurrentIndex(0);
        setSelectedOptionId(null);
        setIsAnswered(false);
        setScore(0);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [category, count]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const currentQuestion: QuizQuestion | undefined = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (optionId === currentQuestion.correctOptionId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (!currentQuestion) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      // Conclusão da Rodada: Salva resultado no armazenamento local
      const finalScore = selectedOptionId === currentQuestion.correctOptionId ? score : score;
      const record = await quizService.saveQuizResult({
        score: finalScore,
        totalQuestions: questions.length,
        percentage: Math.round((finalScore / questions.length) * 100),
        category,
      });

      router.replace({
        pathname: '/(tabs)/recursos/quiz/result',
        params: {
          score: record.score.toString(),
          total: record.totalQuestions.toString(),
          percentage: record.percentage.toString(),
          category: record.category,
          badgeTitle: record.badgeEarned?.title || '',
          badgeIcon: record.badgeEarned?.iconName || 'award',
        },
      } as any);
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedOptionId === currentQuestion?.correctOptionId;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header com botão de desistir/voltar acessível (hitbox >= 48dp) */}
      <View style={styles.header}>
        <AccessiblePressable
          onPress={() => router.push('/(tabs)/recursos/quiz' as any)}
          style={styles.backButton}
          minTouchSize={48}
          accessibilityRole="button"
          accessibilityLabel="Sair do quiz"
        >
          <Feather name="x" size={24} color={THEME.colors.textPrimary} />
        </AccessiblePressable>

        <Text style={styles.headerTitle}>Rodada Prática</Text>

        <View style={styles.scoreBadge}>
          <Feather name="award" size={14} color={THEME.colors.primary} />
          <Text style={styles.scoreText}>Pontos: {score}</Text>
        </View>
      </View>

      {/* Zero Telas em Branco: Estados de Carregamento e Erro */}
      {loading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton height={14} borderRadius={6} style={{ marginBottom: 12 }} />
          <Skeleton height={120} borderRadius={12} style={{ marginBottom: 16 }} />
          <Skeleton height={56} borderRadius={8} style={{ marginBottom: 10 }} />
          <Skeleton height={56} borderRadius={8} style={{ marginBottom: 10 }} />
          <Skeleton height={56} borderRadius={8} style={{ marginBottom: 10 }} />
          <Skeleton height={56} borderRadius={8} />
        </View>
      ) : error || !currentQuestion ? (
        <ErrorCard
          title="Sem perguntas disponíveis"
          message="Não conseguimos carregar o banco de questões neste momento. Verifique seus arquivos locais."
          onRetry={loadQuestions}
          retryLabel="Tentar novamente"
        />
      ) : (
        <>
          {/* Barra de Progresso da Rodada */}
          <QuizProgressBar
            currentIndex={currentIndex}
            total={questions.length}
            categoryLabel={currentQuestion.categoryLabel}
          />

          {/* Card com a Pergunta */}
          <Card style={styles.questionCard}>
            <View style={styles.questionTagRow}>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>
                  Nível: {currentQuestion.difficulty}
                </Text>
              </View>
            </View>

            <Text style={styles.questionTitle}>{currentQuestion.question}</Text>
          </Card>

          {/* Lista de Alternativas (hitbox >= 48dp em cada) */}
          <View style={styles.optionsList}>
            {currentQuestion.options.map((opt, idx) => (
              <QuizOptionButton
                key={opt.id}
                option={opt}
                optionIndex={idx}
                isSelected={selectedOptionId === opt.id}
                isCorrect={opt.id === currentQuestion.correctOptionId}
                isAnswered={isAnswered}
                onSelect={handleSelectOption}
              />
            ))}
          </View>

          {/* Feedback Imediato com Justificativa Agronômica */}
          {isAnswered && (
            <View
              style={[
                styles.feedbackCard,
                isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}
            >
              <View style={styles.feedbackHeaderRow}>
                <Feather
                  name={isCorrect ? 'check-circle' : 'alert-circle'}
                  size={20}
                  color={isCorrect ? '#2E7D32' : '#C62828'}
                />
                <Text
                  style={[
                    styles.feedbackTitle,
                    { color: isCorrect ? '#2E7D32' : '#C62828' },
                  ]}
                >
                  {isCorrect ? 'Resposta Correta!' : 'Atenção ao Manejo:'}
                </Text>
              </View>

              <Text style={styles.feedbackExplanation}>
                {currentQuestion.explanation}
              </Text>

              {currentQuestion.fieldTip && (
                <View style={styles.fieldTipBox}>
                  <Feather name="info" size={14} color={THEME.colors.primaryDark} />
                  <Text style={styles.fieldTipText}>
                    Dica de Campo: {currentQuestion.fieldTip}
                  </Text>
                </View>
              )}

              <View style={styles.nextActionContainer}>
                <Button
                  label={isLastQuestion ? 'Ver Resultado Final' : 'Próxima Questão'}
                  onPress={handleNext}
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={
                    <Feather
                      name={isLastQuestion ? 'award' : 'arrow-right'}
                      size={18}
                      color="#FFFFFF"
                    />
                  }
                />
              </View>
            </View>
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
    justifyContent: 'space-between',
    marginBottom: THEME.dimensions.spacing.md,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: THEME.dimensions.radius.full,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  skeletonContainer: {
    gap: 12,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    padding: THEME.dimensions.spacing.md,
    borderRadius: THEME.dimensions.radius.lg,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  questionTagRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  difficultyBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F57F17',
    textTransform: 'uppercase',
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    lineHeight: 24,
  },
  optionsList: {
    marginBottom: 16,
  },
  feedbackCard: {
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  feedbackCorrect: {
    backgroundColor: '#F1F8E9',
    borderColor: '#C5E1A5',
  },
  feedbackWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FFCDD2',
  },
  feedbackHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  feedbackExplanation: {
    fontSize: 14,
    color: THEME.colors.textPrimary,
    lineHeight: 20,
    marginBottom: 10,
  },
  fieldTipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: THEME.dimensions.radius.sm,
    padding: 8,
    gap: 6,
    marginBottom: 14,
  },
  fieldTipText: {
    flex: 1,
    fontSize: 12,
    color: THEME.colors.primaryDark,
    lineHeight: 17,
    fontWeight: '600',
  },
  nextActionContainer: {
    marginTop: 4,
  },
});
