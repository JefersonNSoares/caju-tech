import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';

const CULTIVO_STAGES = [
  {
    id: 'plantio',
    title: 'Plantio e Espaçamento',
    description: 'Preparo do solo, coveamento e espaçamento recomendado para cajueiro-anão precoce.',
    icon: 'target' as const,
  },
  {
    id: 'irrigacao',
    title: 'Irrigação e Recursos Hídricos',
    description: 'Manejo de água em clima semiárido, gotejamento e microaspersão eficiente.',
    icon: 'droplet' as const,
  },
  {
    id: 'manejo',
    title: 'Poda e Adubação',
    description: 'Poda de formação, limpeza fitossanitária e adubação orgânica e química.',
    icon: 'scissors' as const,
  },
  {
    id: 'pragas',
    title: 'Controle de Pragas e Doenças',
    description: 'Identificação e controle de traça-das-castanhas, broca-das-pontas e antracnose.',
    icon: 'shield' as const,
  },
];

export default function CultivoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Cultivo do Cajueiro</Text>
        <Text style={styles.subtitle}>
          Orientações agronômicas práticas para maximizar a produtividade e saúde do pomar.
        </Text>
      </View>

      <View style={styles.list}>
        {CULTIVO_STAGES.map((stage) => (
          <AccessiblePressable
            key={stage.id}
            onPress={() => {}}
            style={styles.pressableItem}
            accessibilityLabel={`Fase: ${stage.title}`}
          >
            <Card style={styles.card}>
              <View style={styles.iconContainer}>
                <Feather name={stage.icon} size={22} color={THEME.colors.primary} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{stage.title}</Text>
                <Text style={styles.itemDescription}>{stage.description}</Text>
              </View>
              <Feather name="chevron-right" size={20} color={THEME.colors.textMuted} />
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.dimensions.spacing.md,
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
