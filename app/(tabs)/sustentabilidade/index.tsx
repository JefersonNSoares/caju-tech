import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';

export default function SustentabilidadeScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshPrices = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Sustentabilidade e Gestão</Text>
        <Text style={styles.subtitle}>
          Monitoramento climático, cotações regionais e práticas ecológicas de produção.
        </Text>
      </View>

      {/* Clima Regional */}
      <Card style={styles.sectionCard}>
        <View style={styles.cardHeaderRow}>
          <Feather name="sun" size={22} color={THEME.colors.primary} />
          <Text style={styles.cardSectionTitle}>Clima em Piripiri - PI</Text>
        </View>
        <View style={styles.climateGrid}>
          <View style={styles.climateMetric}>
            <Text style={styles.metricLabel}>Temperatura</Text>
            <Text style={styles.metricValue}>32°C</Text>
          </View>
          <View style={styles.climateMetric}>
            <Text style={styles.metricLabel}>Umidade do Ar</Text>
            <Text style={styles.metricValue}>42%</Text>
          </View>
          <View style={styles.climateMetric}>
            <Text style={styles.metricLabel}>Vento</Text>
            <Text style={styles.metricValue}>14 km/h</Text>
          </View>
          <View style={styles.climateMetric}>
            <Text style={styles.metricLabel}>Radiação UV</Text>
            <Text style={styles.metricValue}>Alta (9)</Text>
          </View>
        </View>
      </Card>

      {/* Cotações do Mercado Regional */}
      <Card style={styles.sectionCard}>
        <View style={styles.cardHeaderRow}>
          <Feather name="dollar-sign" size={22} color={THEME.colors.cajuOrange} />
          <Text style={styles.cardSectionTitle}>Cotação Regional de Referência</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceProduct}>Castanha in natura (kg)</Text>
          <Text style={styles.priceValue}>R$ 4,80</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceProduct}>Amêndoa Processada W1 (kg)</Text>
          <Text style={styles.priceValue}>R$ 48,50</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceProduct}>Pedúnculo para indústria (kg)</Text>
          <Text style={styles.priceValue}>R$ 0,65</Text>
        </View>
        <View style={styles.refreshButtonContainer}>
          <Button
            label="Atualizar Cotações"
            onPress={handleRefreshPrices}
            loading={isRefreshing}
            variant="outline"
            size="sm"
            icon={<Feather name="refresh-cw" size={16} color={THEME.colors.primary} />}
          />
        </View>
      </Card>

      {/* Práticas Agroecológicas */}
      <Card style={styles.sectionCard}>
        <View style={styles.cardHeaderRow}>
          <Feather name="shield" size={22} color={THEME.colors.primary} />
          <Text style={styles.cardSectionTitle}>Práticas Agroecológicas</Text>
        </View>
        <Text style={styles.practiceItem}>
          • <Text style={styles.bold}>Polinização Assistida:</Text> Manutenção de abelhas nativas (Jandaíra e Uruçu) para aumento da frutificação.
        </Text>
        <Text style={styles.practiceItem}>
          • <Text style={styles.bold}>Biofertilização:</Text> Uso da compostagem do bagaço do caju e cinzas vegetais no enriquecimento do solo.
        </Text>
      </Card>
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
  sectionCard: {
    marginBottom: THEME.dimensions.spacing.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  climateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  climateMetric: {
    flex: 1,
    minWidth: 120,
    backgroundColor: THEME.colors.background,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  priceProduct: {
    fontSize: 14,
    color: THEME.colors.textPrimary,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  refreshButtonContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  practiceItem: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
});
