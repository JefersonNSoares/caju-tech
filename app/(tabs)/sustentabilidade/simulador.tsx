import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';
import { InteractiveSlider } from '../../../components/sustentabilidade/InteractiveSlider';
import { sustentabilidadeService } from '../../../services/sustentabilidadeService';
import { TipoResiduo } from '../../../types/sustentabilidade';

export default function SimuladorResiduosScreen() {
  const router = useRouter();

  // Estados principais da simulação
  const [tipoResiduo, setTipoResiduo] = useState<TipoResiduo>('casca');
  const [quantidadeKg, setQuantidadeKg] = useState<number>(500);

  // Recálculo instantâneo sem latência (< 100ms) - RF-10, RNF-05
  const parametros = useMemo(
    () => sustentabilidadeService.getParametrosResiduo(tipoResiduo),
    [tipoResiduo]
  );

  const resultado = useMemo(
    () => sustentabilidadeService.calcularSimulacaoResiduo(tipoResiduo, quantidadeKg),
    [tipoResiduo, quantidadeKg]
  );

  // Formatação de moeda BRL
  const valorFormatado = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(resultado.valorEstimado);
  }, [resultado.valorEstimado]);

  const handleTutorialNavigate = () => {
    router.push(parametros.tutorialRoute as any);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabeçalho com Botão Voltar (TEL-SUST-04) */}
      <View style={styles.headerRow}>
        <AccessiblePressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Voltar para a tela anterior"
          accessibilityHint="Retorna à navegação de sustentabilidade"
        >
          <Feather name="arrow-left" size={24} color={THEME.colors.primaryDark} />
        </AccessiblePressable>
        <View style={styles.headerTitles}>
          <Text style={styles.headerCategory}>SUSTENTABILIDADE & INOVAÇÃO</Text>
          <Text style={styles.headerTitle}>Simulador de Renda</Text>
        </View>
      </View>

      {/* Introdução / Subtítulo */}
      <View style={styles.introBox}>
        <Text style={styles.introSubtitle}>
          Descubra quanto você poderia estar lucrando ao reaproveitar subprodutos da sua safra que antes eram descartados.
        </Text>
      </View>

      {/* Seção 1: Seleção do Resíduo (Tabs) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Qual resíduo você quer aproveitar?</Text>
        <View style={styles.tabsRow}>
          {/* Aba Casca / LCC */}
          <AccessiblePressable
            onPress={() => setTipoResiduo('casca')}
            style={[
              styles.tabButton,
              tipoResiduo === 'casca' && styles.tabButtonActive,
            ]}
            accessibilityLabel="Aba Casca de Caju e LCC"
            accessibilityState={{ selected: tipoResiduo === 'casca' }}
          >
            <View style={styles.tabContent}>
              <View
                style={[
                  styles.tabIconCircle,
                  tipoResiduo === 'casca' && styles.tabIconCircleActive,
                ]}
              >
                <Feather
                  name="package"
                  size={18}
                  color={tipoResiduo === 'casca' ? '#FFFFFF' : THEME.colors.primaryDark}
                />
              </View>
              <Text
                style={[
                  styles.tabButtonText,
                  tipoResiduo === 'casca' && styles.tabButtonTextActive,
                ]}
              >
                Casca (LCC)
              </Text>
            </View>
          </AccessiblePressable>

          {/* Aba Bagaço do Caju */}
          <AccessiblePressable
            onPress={() => setTipoResiduo('bagaco')}
            style={[
              styles.tabButton,
              tipoResiduo === 'bagaco' && styles.tabButtonActive,
            ]}
            accessibilityLabel="Aba Bagaço do Pedúnculo de Caju"
            accessibilityState={{ selected: tipoResiduo === 'bagaco' }}
          >
            <View style={styles.tabContent}>
              <View
                style={[
                  styles.tabIconCircle,
                  tipoResiduo === 'bagaco' && styles.tabIconCircleActive,
                ]}
              >
                <Feather
                  name="refresh-cw"
                  size={18}
                  color={tipoResiduo === 'bagaco' ? '#FFFFFF' : THEME.colors.primaryDark}
                />
              </View>
              <Text
                style={[
                  styles.tabButtonText,
                  tipoResiduo === 'bagaco' && styles.tabButtonTextActive,
                ]}
              >
                Bagaço do Caju
              </Text>
            </View>
          </AccessiblePressable>
        </View>

        <Text style={styles.tabDescription}>{parametros.subtitulo}</Text>
      </View>

      {/* Seção 2: Entrada de Dados com Slider e Campo Numérico */}
      <Card style={styles.inputCard}>
        <InteractiveSlider
          value={quantidadeKg}
          onChange={setQuantidadeKg}
          min={0}
          max={100000}
          step={50}
          unit="kg"
        />
      </Card>

      {/* Seção 3: Painel de Resultados (Cartão de Destaque) */}
      <Card style={styles.resultsCard}>
        <View style={styles.resultsBadge}>
          <Feather name="trending-up" size={16} color="#0E3A13" />
          <Text style={styles.resultsBadgeText}>VOCÊ PODERIA ESTAR GANHANDO:</Text>
        </View>

        <View style={styles.moneyContainer}>
          <Text style={styles.moneyValue}>{valorFormatado}</Text>
          <Text style={styles.moneySuffix}>extras</Text>
        </View>

        <Text style={styles.resultsDescription}>{resultado.descricaoGanho}</Text>

        {/* Linha Divisória Suave */}
        <View style={styles.divider} />

        {/* Métricas e Detalhes do Resíduo Gerado */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Resíduo Gerado</Text>
            <Text style={styles.metricValue}>
              {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(resultado.quantidadeResiduo)}{' '}
              {resultado.unidadeResiduo}
            </Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Rendimento Médio</Text>
            <Text style={styles.metricValue}>{resultado.rendimentoPercentual}% da safra</Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Cotação Média</Text>
            <Text style={styles.metricValue}>{resultado.cotacaoReferencia}</Text>
          </View>
        </View>
      </Card>

      {/* Seção 4: Botão de Ação (Call to Action) */}
      <View style={styles.actionContainer}>
        <Button
          label="Como aproveitar este resíduo"
          onPress={handleTutorialNavigate}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Feather name="arrow-right" size={20} color="#FFFFFF" />}
        />
      </View>

      {/* Dica Prática de Campo */}
      <Card style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <Feather name="info" size={20} color={THEME.colors.earthBrown} />
          <Text style={styles.tipTitle}>Orientação para o Agricultor</Text>
        </View>
        <Text style={styles.tipText}>
          {tipoResiduo === 'casca'
            ? 'O Líquido da Casca do Caju (LCC) é muito procurado para produção de resinas e defensivos orgânicos. Cooperativas facilitam o beneficiamento e a venda direta para a indústria.'
            : 'O bagaço restante da extração do suco é rico em fibras. Quando seco ou ensilado, substitui até 30% do milho na ração de caprinos e bovinos na época de estiagem.'}
        </Text>
      </Card>

      <View style={styles.footerSpacing} />
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
    maxWidth: 760,
    alignSelf: 'center',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.dimensions.spacing.sm,
    gap: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    flex: 1,
  },
  headerCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primary,
    letterSpacing: 0.8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  introBox: {
    marginBottom: THEME.dimensions.spacing.md,
  },
  introSubtitle: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    lineHeight: 20,
  },
  sectionContainer: {
    marginBottom: THEME.dimensions.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tabButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: THEME.dimensions.radius.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D7E2D1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabButtonActive: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#E8F5E9',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F4EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconCircleActive: {
    backgroundColor: THEME.colors.primary,
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  tabButtonTextActive: {
    color: THEME.colors.primaryDark,
  },
  tabDescription: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 6,
    fontStyle: 'italic',
  },
  inputCard: {
    marginBottom: THEME.dimensions.spacing.md,
    padding: THEME.dimensions.spacing.md,
    backgroundColor: '#FFFFFF',
  },
  resultsCard: {
    backgroundColor: '#F3F9EE',
    borderWidth: 2,
    borderColor: '#A4C69D',
    padding: THEME.dimensions.spacing.lg,
    marginBottom: THEME.dimensions.spacing.lg,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  resultsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#D7EBD0',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  resultsBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0E3A13',
    letterSpacing: 0.5,
  },
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginVertical: 4,
  },
  moneyValue: {
    fontSize: 34,
    fontWeight: '900',
    color: THEME.colors.primaryDark,
  },
  moneySuffix: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  resultsDescription: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
    marginBottom: THEME.dimensions.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: '#D1E3CC',
    marginVertical: THEME.dimensions.spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  actionContainer: {
    marginBottom: THEME.dimensions.spacing.lg,
  },
  tipCard: {
    backgroundColor: '#FFFDE7',
    borderColor: '#FFE082',
    borderWidth: 1,
    padding: THEME.dimensions.spacing.md,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.earthBrown,
  },
  tipText: {
    fontSize: 13,
    color: THEME.colors.earthBrown,
    lineHeight: 19,
  },
  footerSpacing: {
    height: 48,
  },
});
