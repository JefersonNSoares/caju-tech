import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { derivadosService } from '../../../services/derivadosService';

export default function DerivadoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const derivado = derivadosService.getDerivadoById(id || '');

  // Fallback para rota inválida ou ID não localizado (TEL-EST-01: Zero Telas em Branco)
  if (!derivado) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Derivado não encontrado"
          description="O produto que você procura não está em nossa cesta de derivados do caju."
          actionLabel="Voltar para Derivados"
          onAction={() => router.push('/(tabs)/derivados' as any)}
          iconName="alert-circle"
        />
      </View>
    );
  }

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/derivados' as any);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. Header com botão de voltar (Hitbox >= 48dp) e Tag */}
      <View style={styles.headerRow}>
        <AccessiblePressable
          onPress={handleBack}
          style={styles.backButton}
          accessibilityLabel="Voltar para o catálogo de derivados"
          accessibilityRole="button"
        >
          <Feather name="arrow-left" size={24} color={THEME.colors.primaryDark} />
        </AccessiblePressable>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{derivado.tag}</Text>
        </View>
      </View>

      {/* 2. Card de Visão Geral & Metadados */}
      <Card style={styles.sectionCard}>
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <Feather name={derivado.icon} size={28} color={THEME.colors.primary} />
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.screenTitle}>{derivado.title}</Text>
            <Text style={styles.materiaPrimaBadge}>
              Matéria-prima: {derivado.materiaPrimaPrincipal}
            </Text>
          </View>
        </View>

        <Text style={styles.descriptionText}>{derivado.descricao}</Text>

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Feather name="clock" size={16} color={THEME.colors.primary} />
            <Text style={styles.metaLabel}>Tempo Estimado</Text>
            <Text style={styles.metaValue}>{derivado.tempoMedio}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="bar-chart" size={16} color={THEME.colors.primary} />
            <Text style={styles.metaLabel}>Dificuldade</Text>
            <Text style={styles.metaValue}>{derivado.dificuldade}</Text>
          </View>
        </View>
      </Card>

      {/* 3. Card de Aproveitamento Integral & Rendimento Econômico (US2) */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="pie-chart" size={20} color={THEME.colors.primary} />
          <Text style={styles.sectionTitle}>Aproveitamento Integral & Rendimento</Text>
        </View>

        <View style={styles.rendimentoContainer}>
          <View style={styles.rendimentoRow}>
            <Text style={styles.rendimentoLabel}>Matéria-prima base:</Text>
            <Text style={styles.rendimentoValue}>{derivado.rendimento.materiaPrima}</Text>
          </View>
          <View style={styles.rendimentoRow}>
            <Text style={styles.rendimentoLabel}>Produto final obtido:</Text>
            <Text style={styles.rendimentoValueHighlight}>{derivado.rendimento.produtoFinal}</Text>
          </View>
          <View style={styles.rendimentoRow}>
            <Text style={styles.rendimentoLabel}>Taxa de aproveitamento:</Text>
            <Text style={styles.rendimentoValue}>{derivado.rendimento.taxaAproveitamento}</Text>
          </View>

          {derivado.rendimento.subprodutosSecundarios.length > 0 && (
            <View style={styles.subprodutosBox}>
              <Text style={styles.subprodutosTitle}>Subprodutos & Desperdício Zero:</Text>
              {derivado.rendimento.subprodutosSecundarios.map((sub, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Feather name="check" size={15} color={THEME.colors.success} style={styles.bulletIcon} />
                  <Text style={styles.subprodutoItem}>{sub}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Card>

      {/* 4. Card de Equipamentos e Insumos */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="tool" size={20} color={THEME.colors.primary} />
          <Text style={styles.sectionTitle}>Equipamentos e Insumos Necessários</Text>
        </View>

        <Text style={styles.subsectionTitle}>Equipamentos:</Text>
        <View style={styles.tagWrap}>
          {derivado.equipamentos.map((equip, idx) => (
            <View key={idx} style={styles.equipTag}>
              <Feather name="check-circle" size={13} color={THEME.colors.primaryDark} style={{ marginRight: 6 }} />
              <Text style={styles.equipTagText}>{equip}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.subsectionTitle, { marginTop: 14 }]}>Insumos e Ingredientes:</Text>
        <View style={styles.tagWrap}>
          {derivado.insumos.map((insumo, idx) => (
            <View key={idx} style={styles.insumoTag}>
              <Feather name="package" size={13} color={THEME.colors.earthBrown} style={{ marginRight: 6 }} />
              <Text style={styles.insumoTagText}>{insumo}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* 5. Passo a Passo Sequencial de Processamento (US1) */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="list" size={20} color={THEME.colors.primary} />
          <Text style={styles.sectionTitle}>Passo a Passo do Processamento</Text>
        </View>

        <View style={styles.passosContainer}>
          {derivado.passos.map((passo) => (
            <View key={passo.ordem} style={styles.passoItem}>
              <View style={styles.passoHeaderRow}>
                <View style={styles.passoBadge}>
                  <Text style={styles.passoBadgeText}>{passo.ordem}</Text>
                </View>
                <Text style={styles.passoTitle}>{passo.titulo}</Text>
              </View>

              <Text style={styles.passoDescricao}>{passo.descricao}</Text>

              {passo.dica && (
                <View style={styles.dicaCard}>
                  <Feather name="info" size={16} color={THEME.colors.cajuOrange} style={styles.dicaIcon} />
                  <Text style={styles.dicaText}>
                    <Text style={styles.dicaBold}>Dica prática: </Text>
                    {passo.dica}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Card>

      {/* 6. Boas Práticas e Higiene Rural (US3) */}
      <Card style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="shield" size={20} color={THEME.colors.primary} />
          <Text style={styles.sectionTitle}>Boas Práticas e Qualidade Sanitária</Text>
        </View>

        <View style={styles.boasPraticasContainer}>
          {derivado.boasPraticas.map((pratica, idx) => (
            <View key={idx} style={styles.praticaRow}>
              <Feather name="check" size={16} color={THEME.colors.success} style={styles.praticaIcon} />
              <Text style={styles.praticaText}>{pratica}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* 7. Alertas de Segurança Operacional no Manuseio (US3) */}
      {derivado.avisosSeguranca && derivado.avisosSeguranca.length > 0 && (
        <Card style={[styles.sectionCard, styles.alertCard]}>
          <View style={styles.sectionHeaderRow}>
            <Feather name="alert-triangle" size={20} color={THEME.colors.warning} />
            <Text style={styles.alertTitle}>Segurança no Manuseio</Text>
          </View>
          {derivado.avisosSeguranca.map((aviso, idx) => (
            <Text key={idx} style={styles.alertText}>
              {aviso}
            </Text>
          ))}
        </Card>
      )}

      {/* 8. Botão de retorno inferior */}
      <View style={styles.bottomNavContainer}>
        <AccessiblePressable
          onPress={handleBack}
          style={styles.bottomReturnButton}
          accessibilityLabel="Voltar para a lista de derivados"
          accessibilityRole="button"
        >
          <Feather name="chevron-left" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.bottomReturnText}>Voltar para Derivados</Text>
        </AccessiblePressable>
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
    paddingBottom: THEME.dimensions.spacing.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.dimensions.spacing.sm,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  badgeContainer: {
    backgroundColor: THEME.colors.earthLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.earthBrown,
  },
  sectionCard: {
    marginBottom: THEME.dimensions.spacing.md,
    padding: THEME.dimensions.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.dimensions.spacing.md,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  titleTextContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
    marginBottom: 4,
  },
  materiaPrimaBadge: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: THEME.colors.textSecondary,
    marginBottom: THEME.dimensions.spacing.md,
  },
  metaGrid: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: THEME.dimensions.radius.md,
    padding: THEME.dimensions.spacing.sm,
    gap: 12,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  metaLabel: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginTop: 1,
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.dimensions.spacing.sm,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  rendimentoContainer: {
    gap: 8,
  },
  rendimentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rendimentoLabel: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
  },
  rendimentoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  rendimentoValueHighlight: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  subprodutosBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: THEME.dimensions.radius.md,
    padding: THEME.dimensions.spacing.sm,
    marginTop: 8,
  },
  subprodutosTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  subprodutoItem: {
    fontSize: 12,
    color: THEME.colors.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
  subsectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginTop: 6,
    marginBottom: 6,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  equipTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  equipTagText: {
    fontSize: 12,
    color: THEME.colors.primaryDark,
    fontWeight: '500',
  },
  insumoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.earthLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  insumoTagText: {
    fontSize: 12,
    color: THEME.colors.earthBrown,
    fontWeight: '500',
  },
  passosContainer: {
    gap: 16,
    marginTop: 8,
  },
  passoItem: {
    borderLeftWidth: 2,
    borderLeftColor: THEME.colors.primaryLight,
    paddingLeft: 12,
    paddingVertical: 2,
  },
  passoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  passoBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  passoBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  passoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    flex: 1,
  },
  passoDescricao: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 20,
    marginTop: 2,
  },
  dicaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF8E1',
    borderRadius: THEME.dimensions.radius.md,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  dicaIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  dicaText: {
    fontSize: 12,
    color: THEME.colors.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
  dicaBold: {
    fontWeight: '700',
    color: THEME.colors.cajuOrange,
  },
  boasPraticasContainer: {
    gap: 8,
    marginTop: 4,
  },
  praticaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  praticaIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  praticaText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    flex: 1,
    lineHeight: 19,
  },
  alertCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FCD34D',
    borderWidth: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.warning,
  },
  alertText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 20,
    fontWeight: '500',
  },
  bottomNavContainer: {
    marginTop: THEME.dimensions.spacing.md,
    alignItems: 'center',
  },
  bottomReturnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.dimensions.radius.md,
    paddingHorizontal: 20,
    minHeight: 48,
    minWidth: 48,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  bottomReturnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
