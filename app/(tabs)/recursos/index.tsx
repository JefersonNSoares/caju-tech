import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';

const EDUCATIONAL_RESOURCES = [
  {
    id: 'quiz',
    title: 'Quiz do Produtor e Estudante',
    description: 'Teste seus conhecimentos em manejo, pragas e derivados com feedback imediato.',
    icon: 'help-circle' as const,
    tag: 'Interativo',
  },
  {
    id: 'cartilha',
    title: 'Cartilha Técnica Digital',
    description: 'Manual completo em PDF com ilustrações sobre cajucultura no semiárido.',
    icon: 'book' as const,
    tag: 'Disponível Offline',
  },
  {
    id: 'midias',
    title: 'Vídeos e Infográficos Práticos',
    description: 'Aulas curtas sobre enxertia, colheita e receitas passo a passo.',
    icon: 'video' as const,
    tag: 'Multimídia',
  },
];

export default function RecursosScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Recursos Educativos</Text>
        <Text style={styles.subtitle}>
          Materiais práticos para formação técnica de agricultores, estudantes e extensionistas.
        </Text>
      </View>

      <View style={styles.list}>
        {EDUCATIONAL_RESOURCES.map((res) => (
          <AccessiblePressable
            key={res.id}
            onPress={() => {}}
            style={styles.pressableItem}
            accessibilityLabel={`Recurso: ${res.title}`}
          >
            <Card style={styles.card}>
              <View style={styles.badgeRow}>
                <Text style={styles.badgeText}>{res.tag}</Text>
              </View>
              <View style={styles.mainRow}>
                <View style={styles.iconContainer}>
                  <Feather name={res.icon} size={22} color="#7B1FA2" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{res.title}</Text>
                  <Text style={styles.itemDescription}>{res.description}</Text>
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
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7B1FA2',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE7F6',
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
