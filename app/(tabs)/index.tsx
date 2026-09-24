import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { Card } from '../../components/common/Card';
import { AccessiblePressable } from '../../components/common/AccessiblePressable';
import { Button } from '../../components/common/Button';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bem-vindo ao CajuTech</Text>
        <Text style={styles.subtitle}>
          Inovação, manejo sustentável e agregação de valor na cajucultura.
        </Text>
      </View>

      {/* Weather & Location Summary */}
      <Card style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <View style={styles.locationTag}>
            <Feather name="map-pin" size={16} color={THEME.colors.primary} />
            <Text style={styles.locationText}>Piripiri - PI</Text>
          </View>
          <View style={styles.weatherCondition}>
            <Feather name="sun" size={20} color={THEME.colors.cajuYellow} />
            <Text style={styles.temperature}>32°C</Text>
          </View>
        </View>
        <Text style={styles.weatherAdvice}>
          Período propício para monitoramento da floração e colheita do caju precoce.
        </Text>
      </Card>

      {/* 2-Touch Direct Access Modules */}
      <Text style={styles.sectionTitle}>Módulos Principais</Text>

      <View style={styles.grid}>
        <AccessiblePressable
          onPress={() => router.push('/cultivo')}
          style={styles.moduleCard}
          accessibilityLabel="Acessar módulo de Cultivo"
        >
          <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
            <Feather name="feather" size={24} color={THEME.colors.primary} />
          </View>
          <Text style={styles.moduleTitle}>Cultivo</Text>
          <Text style={styles.moduleDescription}>Plantio, irrigação, manejo e pragas</Text>
        </AccessiblePressable>

        <AccessiblePressable
          onPress={() => router.push('/derivados')}
          style={styles.moduleCard}
          accessibilityLabel="Acessar módulo de Derivados"
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FFF8E1' }]}>
            <Feather name="package" size={24} color={THEME.colors.cajuOrange} />
          </View>
          <Text style={styles.moduleTitle}>Derivados</Text>
          <Text style={styles.moduleDescription}>Aproveitamento integral e receitas</Text>
        </AccessiblePressable>

        <AccessiblePressable
          onPress={() => router.push('/sustentabilidade')}
          style={styles.moduleCard}
          accessibilityLabel="Acessar módulo de Sustentabilidade"
        >
          <View style={[styles.iconCircle, { backgroundColor: '#E0F2F1' }]}>
            <Feather name="bar-chart-2" size={24} color="#00796B" />
          </View>
          <Text style={styles.moduleTitle}>Sustentabilidade</Text>
          <Text style={styles.moduleDescription}>Clima, cotações e indicadores rurais</Text>
        </AccessiblePressable>

        <AccessiblePressable
          onPress={() => router.push('/recursos')}
          style={styles.moduleCard}
          accessibilityLabel="Acessar módulo de Recursos"
        >
          <View style={[styles.iconCircle, { backgroundColor: '#F3E5F5' }]}>
            <Feather name="book-open" size={24} color="#7B1FA2" />
          </View>
          <Text style={styles.moduleTitle}>Recursos</Text>
          <Text style={styles.moduleDescription}>Quiz, cartilha técnica e vídeos</Text>
        </AccessiblePressable>
      </View>

      <View style={styles.footerAction}>
        <Button
          label="Identificar Perfil / Entrar"
          variant="outline"
          onPress={() => router.push('/login')}
          icon={<Feather name="user" size={18} color={THEME.colors.primary} />}
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
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: THEME.dimensions.spacing.md,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  subtitle: {
    fontSize: 15,
    color: THEME.colors.textSecondary,
    marginTop: 4,
    lineHeight: 22,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: THEME.dimensions.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: THEME.colors.primary,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  weatherCondition: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  temperature: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  weatherAdvice: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: THEME.dimensions.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: THEME.dimensions.spacing.lg,
  },
  moduleCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 16,
  },
  footerAction: {
    marginTop: THEME.dimensions.spacing.sm,
    marginBottom: THEME.dimensions.spacing.xl,
  },
});
