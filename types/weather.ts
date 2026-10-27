import { Feather } from '@expo/vector-icons';

export interface WeatherData {
  city: string;
  temperature: number; // Temperatura em °C (ex: 35.0)
  apparentTemperature: number; // Sensação térmica em °C (ex: 36.7)
  humidity: number; // Umidade relativa em %
  windSpeed: number; // Velocidade do vento em km/h
  precipitation: number; // Precipitação acumulada em mm
  isDay: boolean; // Se é dia ou noite
  weatherCode: number; // Código meteorológico WMO
  conditionLabel: string; // Ex: 'Ensolarado', 'Parcialmente Nublado'
  iconName: keyof typeof Feather.glyphMap;
  agriculturalAdvice: string; // Recomendação agronômica adaptada à cajucultura
  updatedAt: string; // Ex: "10:05" ou horário formatado
  timestamp: number; // Timestamp Unix em ms
  isLive: boolean; // True se os dados foram obtidos com sucesso em tempo real da API
  isOffline: boolean; // True se está utilizando cache local por falta de conexão
}
