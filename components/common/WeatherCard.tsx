import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { Card } from './Card';
import { AccessiblePressable } from './AccessiblePressable';
import { WeatherData } from '../../types/weather';

export interface WeatherCardProps {
  weather: WeatherData;
  loading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  showAdvice?: boolean;
  testID?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  loading = false,
  isRefreshing = false,
  onRefresh,
  showAdvice = true,
  testID,
}) => {
  const getIconColor = () => {
    switch (weather.iconName) {
      case 'sun':
        return THEME.colors.cajuYellow;
      case 'cloud-rain':
      case 'cloud-drizzle':
        return '#0288D1';
      case 'cloud-lightning':
        return '#F57C00';
      case 'cloud':
      default:
        return '#78909C';
    }
  };

  return (
    <Card testID={testID} style={styles.card}>
      {/* Cabeçalho do Card: Localização, Badge de Tempo Real e Botão de Atualizar */}
      <View style={styles.headerRow}>
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={16} color={THEME.colors.primary} />
          <Text style={styles.locationText}>{weather.city}</Text>
        </View>

        <View style={styles.statusAndRefresh}>
          {weather.isLive ? (
            <View style={styles.liveBadge}>
              <View style={styles.livePulseDot} />
              <Text style={styles.liveBadgeText}>TEMPO REAL</Text>
            </View>
          ) : (
            <View style={styles.offlineBadge}>
              <Feather name="wifi-off" size={12} color={THEME.colors.offline} />
              <Text style={styles.offlineBadgeText}>OFFLINE</Text>
            </View>
          )}

          {onRefresh && (
            <AccessiblePressable
              onPress={onRefresh}
              style={styles.refreshButton}
              accessibilityLabel="Atualizar temperatura e clima em tempo real"
              accessibilityHint="Recarrega os dados da estação meteorológica mais recente"
              minTouchSize={48}
            >
              {isRefreshing ? (
                <ActivityIndicator size="small" color={THEME.colors.primary} />
              ) : (
                <Feather name="refresh-cw" size={18} color={THEME.colors.primaryDark} />
              )}
            </AccessiblePressable>
          )}
        </View>
      </View>

      {/* Seção Principal: Temperatura, Ícone e Sensação */}
      <View style={styles.mainWeatherRow}>
        <View style={styles.temperatureCol}>
          <View style={styles.tempNumbersRow}>
            <Text style={styles.temperatureText}>
              {Math.round(weather.temperature)}°
            </Text>
            <Text style={styles.unitText}>C</Text>
          </View>
          <Text style={styles.conditionText}>{weather.conditionLabel}</Text>
          <Text style={styles.apparentText}>
            Sensação de {Math.round(weather.apparentTemperature)}°C
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Feather name={weather.iconName} size={48} color={getIconColor()} />
        </View>
      </View>

      {/* Indicadores Rápidos: Umidade, Vento e Horário da Medição */}
      <View style={styles.metricsRow}>
        <View style={styles.metricChip}>
          <Feather name="droplet" size={14} color="#0288D1" />
          <Text style={styles.metricText}>{weather.humidity}% umidade</Text>
        </View>

        <View style={styles.metricChip}>
          <Feather name="wind" size={14} color="#546E7A" />
          <Text style={styles.metricText}>{weather.windSpeed} km/h</Text>
        </View>

        <View style={styles.metricChip}>
          <Feather name="clock" size={14} color={THEME.colors.textMuted} />
          <Text style={styles.metricText}>
            {weather.isLive ? `Às ${weather.updatedAt}` : 'Em cache'}
          </Text>
        </View>
      </View>

      {/* Conselho Agronômico para o Cajueiro */}
      {showAdvice && weather.agriculturalAdvice && (
        <View style={styles.adviceBox}>
          <Feather name="compass" size={16} color={THEME.colors.primaryDark} style={styles.adviceIcon} />
          <Text style={styles.adviceText}>{weather.agriculturalAdvice}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(27, 94, 32, 0.15)',
    borderRadius: THEME.dimensions.radius.lg,
    padding: THEME.dimensions.spacing.md,
    marginBottom: THEME.dimensions.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  statusAndRefresh: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  livePulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#2E7D32',
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1B5E20',
    letterSpacing: 0.5,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  offlineBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.offline,
    letterSpacing: 0.5,
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F4EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWeatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  temperatureCol: {
    flex: 1,
  },
  tempNumbersRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperatureText: {
    fontSize: 38,
    fontWeight: '900',
    color: THEME.colors.textPrimary,
    lineHeight: 44,
  },
  unitText: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.primary,
    marginTop: 4,
  },
  conditionText: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
    marginTop: 2,
  },
  apparentText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 1,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F9FBF7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F2ED',
  },
  metricChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F5F7F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  adviceBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: THEME.dimensions.radius.md,
    padding: 10,
    marginTop: 12,
    gap: 8,
  },
  adviceIcon: {
    marginTop: 2,
  },
  adviceText: {
    flex: 1,
    fontSize: 13,
    color: THEME.colors.primaryDark,
    fontWeight: '600',
    lineHeight: 18,
  },
});
