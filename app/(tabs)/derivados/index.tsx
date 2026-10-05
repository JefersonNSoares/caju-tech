import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';

interface DerivadoCategory {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
}

const DERIVADOS_CATEGORIES: DerivadoCategory[] = [
  {
    id: 'castanha',
    title: 'Castanha e LCC',
    tag: 'Alto Valor Agregado',
    description: 'Processamento da amêndoa, autoclavagem, corte, estufagem e aproveitamento do Líquido da Casca.',
    icon: 'disc',
    route: '/derivados/castanha',
  },
  {
    id: 'cajuina',
    title: 'Cajuína Tradicional Piauiense',
    tag: 'Patrimônio Cultural',
    description: 'Clarificação por gelatina, filtração e pasteurização para obtenção da cor âmbar cristalina.',
    icon: 'coffee',
    route: '/derivados/cajuina',
  },
  {
    id: 'doces',
    title: 'Doces, Polpas e Compotas',
    tag: 'Agricultura Familiar',
    description: 'Doce em calda, geleia, pasta de caju e produção de polpa congelada para sucos.',
    icon: 'sun',
    route: '/derivados/doces',
  },
  {
    id: 'fibra',
    title: 'Fibra de Caju (Carne Vegetal)',
    tag: 'Inovação e Zero Desperdício',
    description: 'Uso do bagaço residual prensado para hambúrgueres vegetais, almôndegas e enriquecimento nutricional.',
    icon: 'layers',
    route: '/derivados/fibra',
  },
];

export default function DerivadosScreen() {
  const router = useRouter();

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
            onPress={() => router.push(item.route as any)}
            style={styles.pressableItem}
            accessibilityLabel={`Acessar derivado: ${item.title}`}
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
    backgroundColor: '#FFF8E1',
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