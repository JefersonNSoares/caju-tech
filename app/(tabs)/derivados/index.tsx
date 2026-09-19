import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';

const DERIVADOS_CATEGORIES = [
  {
    id: 'castanha',
    title: 'Castanha e LCC',
    tag: 'Alto Valor Agregado',
    description: 'Processamento da amêndoa, autoclavagem, corte, estufagem e aproveitamento do Líquido da Casca.',
    icon: 'disc' as const,
  },
  {
    id: 'cajuina',
    title: 'Cajuína Tradicional Piauiense',
    tag: 'Patrimônio Cultural',
    description: 'Clarificação por gelatina, filtração e pasteurização para obtenção da cor âmbar cristalina.',
    icon: 'coffee' as const,
  },
  {
    id: 'doces',
    title: 'Doces, Polpas e Compotas',
    tag: 'Agricultura Familiar',
    description: 'Doce em calda, geleia, pasta de caju e produção de polpa congelada para sucos.',
    icon: 'sun' as const,
  },
  {
    id: 'fibra',
    title: 'Fibra de Caju (Carne Vegetal)',
    tag: 'Inovação e Zero Desperdício',
    description: 'Uso do bagaço residual prensado para hambúrgueres vegetais, almôndegas e enriquecimento nutricional.',
    icon: 'layers' as const,
  },
];

export default function DerivadosScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Derivados do Caju</Text>
        <Text style={styles.subtitle}>
          Catálogo técnico de subprodutos para aproveitamento total do fruto e pedúnculo.
        </Text>
      </View>

      <View style={styles.list}>
        {DERIVADOS_CATEGORIES.map((item) => (
          <AccessiblePressable
            key={item.id}
            onPress={() => {}}
            style={styles.pressableItem}
            accessibilityLabel={`Derivado: ${item.title}`}
          >
            <Card style={styles.card}>
              <View style={styles.badgeRow}>
                <Text style={styles.badgeText}>{item.tag}</Text>
              </View>
              <View style={styles.mainRow}>
                <View style={styles.iconContainer}>
                  <Feather name={item.icon} size={22} color={THEME.colors.cajuOrange} />
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
    gap: 12,
  },
  pressableItem: {
    width: '100%',
  },
  card: {
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
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
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
