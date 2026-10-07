import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';

interface SustentabilidadeCategory {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
}

const SUSTENTABILIDADE_CATEGORIES: SustentabilidadeCategory[] = [
  {
    id: 'residuos',
    title: 'Aproveitamento de Resíduos',
    tag: 'Economia Circular',
    description: 'Técnicas para reaproveitamento da casca, folhas e bagaço do caju na compostagem e adubação orgânica.',
    icon: 'refresh-cw',
    route: '/sustentabilidade/residuos',
  },
  {
    id: 'bioprodutos',
    title: 'Bioprodutos',
    tag: 'Inovação Verde',
    description: 'Produção de bioplásticos, resinas e defensivos naturais a partir do Líquido da Casca do Caju (LCC).',
    icon: 'package',
    route: '/sustentabilidade/bioprodutos',
  },
  {
    id: 'boas-praticas',
    title: 'Boas Práticas Ambientais',
    tag: 'Manejo Sustentável',
    description: 'Uso eficiente de água, controle biológico de pragas e conservação do solo na cajucultura.',
    icon: 'feather',
    route: '/sustentabilidade/boas-praticas',
  },
  {
    id: 'renda',
    title: 'Geração de Valor e Renda',
    tag: 'Impacto Social',
    description: 'Modelos de negócios sustentáveis, certificações e estratégias de mercado para agricultura familiar.',
    icon: 'trending-up',
    route: '/sustentabilidade/renda',
  },
];

export default function SustentabilidadeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Sustentabilidade e Inovação</Text>
        <Text style={styles.subtitle}>
          Práticas ambientais, bioprodutos e soluções para um ecossistema agrícola sustentável e rentável.
        </Text>
      </View>

      <View style={styles.list}>
        {SUSTENTABILIDADE_CATEGORIES.map((item) => (
          <AccessiblePressable
            key={item.id}
            onPress={() => router.push(item.route as any)}
            style={styles.pressableItem}
            accessibilityLabel={`Acessar módulo: ${item.title}`}
          >
            <Card style={styles.card}>
              <View style={styles.badgeRow}>
                <Text style={styles.badgeText}>{item.tag}</Text>
              </View>
              <View style={styles.mainRow}>
                <View style={styles.iconContainer}>
                  <Feather name={item.icon} size={22} color={THEME.colors.primaryDark} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                <Feather name="chevron-right" size={20} color={THEME.colors.textMuted} />
              </View>
            </Card>
          </AccessiblePressable>
        ))}
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
    marginBottom: THEME.dimensions.spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  subtitle: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  list: {
    width: '100%',
    gap: 12,
    alignItems: 'stretch',
  },
  pressableItem: {
    width: '100%',
    alignSelf: 'stretch',
  },
  card: {
    width: '100%',
    padding: THEME.dimensions.spacing.md,
  },
  badgeRow: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.earthLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.earthBrown,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
});
