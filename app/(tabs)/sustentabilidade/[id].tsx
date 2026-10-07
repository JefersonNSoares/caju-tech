import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { sustentabilidadeService } from '../../../services/sustentabilidadeService';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';

export default function SustentabilidadeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  if (!id) return null;

  const pratica = sustentabilidadeService.getPraticaById(id);

  if (!pratica) {
    return (
      <View style={styles.container}>
        <EmptyState
          iconName="alert-circle"
          title="Prática Sustentável Não Encontrada"
          description="Desculpe, não conseguimos encontrar a prática sustentável que procura."
          actionLabel="Voltar para Sustentabilidade"
          onAction={() => router.replace('/sustentabilidade' as any)}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AccessiblePressable
        onPress={() => router.back()}
        style={styles.backButton}
        accessibilityLabel="Voltar"
      >
        <Feather name="arrow-left" size={24} color={THEME.colors.textPrimary} />
      </AccessiblePressable>

      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Feather name={pratica.icon as any} size={32} color={THEME.colors.primaryDark} />
        </View>
        <Text style={styles.title}>{pratica.title}</Text>
        <View style={styles.badgeRow}>
          <Text style={styles.badgeText}>{pratica.tag}</Text>
        </View>
        <Text style={styles.description}>{pratica.description}</Text>
      </View>

      {pratica.conteudo.map((secao, index) => (
        <Card key={index} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{secao.titulo}</Text>
          </View>
          <Text style={styles.sectionText}>{secao.texto}</Text>
          
          {secao.itens && secao.itens.length > 0 && (
            <View style={styles.listContainer}>
              {secao.itens.map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {secao.dicaPratica && (
            <View style={styles.dicaContainer}>
              <Feather name="info" size={20} color={THEME.colors.earthBrown} />
              <Text style={styles.dicaText}>{secao.dicaPratica}</Text>
            </View>
          )}
        </Card>
      ))}
      
      <View style={styles.footerSpace} />
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
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: THEME.dimensions.spacing.sm,
  },
  header: {
    alignItems: 'center',
    marginBottom: THEME.dimensions.spacing.xl,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: THEME.dimensions.spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
    textAlign: 'center',
    marginBottom: THEME.dimensions.spacing.sm,
  },
  badgeRow: {
    backgroundColor: THEME.colors.earthLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: THEME.dimensions.spacing.md,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.earthBrown,
  },
  description: {
    fontSize: 16,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionCard: {
    padding: THEME.dimensions.spacing.md,
    marginBottom: THEME.dimensions.spacing.md,
  },
  sectionHeader: {
    marginBottom: THEME.dimensions.spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  sectionText: {
    fontSize: 15,
    color: THEME.colors.textSecondary,
    lineHeight: 22,
    marginBottom: THEME.dimensions.spacing.sm,
  },
  listContainer: {
    marginTop: THEME.dimensions.spacing.sm,
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primary,
    marginTop: 8,
    marginRight: 10,
  },
  listItemText: {
    flex: 1,
    fontSize: 15,
    color: THEME.colors.textPrimary,
    lineHeight: 22,
  },
  dicaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: THEME.dimensions.spacing.sm,
    borderRadius: 8,
    marginTop: THEME.dimensions.spacing.md,
    gap: 12,
  },
  dicaText: {
    flex: 1,
    fontSize: 14,
    color: THEME.colors.earthBrown,
    fontWeight: '600',
    lineHeight: 20,
  },
  footerSpace: {
    height: 40,
  },
});
