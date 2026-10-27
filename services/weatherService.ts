import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '../types/weather';
import { STORAGE_KEYS } from '../constants/storage';
import { Feather } from '@expo/vector-icons';

type IconName = keyof typeof Feather.glyphMap;

interface CityCoordinates {
  lat: number;
  lon: number;
  name: string;
}

const CITY_COORDINATES: Record<string, CityCoordinates> = {
  'piripiri': { lat: -4.2733, lon: -41.7769, name: 'Piripiri - PI' },
  'teresina': { lat: -5.092, lon: -42.8038, name: 'Teresina - PI' },
  'parnaiba': { lat: -2.909, lon: -41.7767, name: 'Parnaíba - PI' },
  'picos': { lat: -7.077, lon: -41.467, name: 'Picos - PI' },
  'canto do buriti': { lat: -8.11, lon: -42.94, name: 'Canto do Buriti - PI' },
};

const DEFAULT_CITY: CityCoordinates = {
  lat: -4.2733,
  lon: -41.7769,
  name: 'Piripiri - PI',
};

function getCityCoords(cityName?: string): CityCoordinates {
  if (!cityName) return DEFAULT_CITY;
  const normalized = cityName.toLowerCase().trim();
  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (normalized.includes(key)) {
      return coords;
    }
  }
  return { ...DEFAULT_CITY, name: cityName };
}

function getWeatherCondition(code: number): { label: string; icon: IconName } {
  switch (code) {
    case 0:
      return { label: 'Ensolarado', icon: 'sun' };
    case 1:
      return { label: 'Predomínio de Sol', icon: 'sun' };
    case 2:
      return { label: 'Parcialmente Nublado', icon: 'cloud' };
    case 3:
      return { label: 'Nublado', icon: 'cloud' };
    case 45:
    case 48:
      return { label: 'Nevoeiro', icon: 'cloud' };
    case 51:
    case 53:
    case 55:
      return { label: 'Garoa / Chuvisco', icon: 'cloud-drizzle' };
    case 61:
    case 63:
    case 65:
      return { label: 'Chuva', icon: 'cloud-rain' };
    case 80:
    case 81:
    case 82:
      return { label: 'Pancadas de Chuva', icon: 'cloud-rain' };
    case 95:
    case 96:
    case 99:
      return { label: 'Trovoadas', icon: 'cloud-lightning' };
    default:
      return { label: 'Tempo Estável', icon: 'sun' };
  }
}

function generateAgriculturalAdvice(
  temp: number,
  humidity: number,
  precip: number,
  windSpeed: number
): string {
  if (precip > 0.5) {
    return 'Chuva detectada na região: suspenda pulverizações de defensivos foliares para evitar perda de insumos.';
  }
  if (temp >= 35) {
    return 'Calor intenso (alta evapotranspiração): irrigue preferencialmente no início da manhã ou no fim da tarde.';
  }
  if (temp >= 29 && humidity <= 45) {
    return 'Tempo seco e ensolarado: condições ideais para colheita do caju e secagem natural das castanhas ao sol.';
  }
  if (humidity >= 70) {
    return 'Umidade elevada no ar: redobre a atenção com inspeção de brotos contra o fungo da antracnose.';
  }
  if (windSpeed >= 24) {
    return 'Ventos moderados: cuidado com a desidratação das floradas e possíveis quebras de ramos finos.';
  }
  return 'Condições climáticas favoráveis para o monitoramento da floração e colheita do caju precoce.';
}

function formatCurrentTime(date = new Date()): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const weatherService = {
  /**
   * Obtém a previsão/temperatura do cache offline local.
   */
  async getCachedWeather(): Promise<WeatherData | null> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.WEATHER_CACHE);
      if (!raw) return null;
      const data = JSON.parse(raw) as WeatherData;
      return {
        ...data,
        isLive: false,
        isOffline: true,
      };
    } catch {
      return null;
    }
  },

  /**
   * Salva os dados de clima no cache local para resiliência offline.
   */
  async saveWeatherToCache(data: WeatherData): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WEATHER_CACHE, JSON.stringify(data));
    } catch (err) {
      console.warn('Aviso: Falha ao salvar clima no cache', err);
    }
  },

  /**
   * Fornece um clima padrão de segurança caso a API falhe e não haja cache.
   */
  getFallbackWeather(cityName = 'Piripiri - PI'): WeatherData {
    return {
      city: cityName,
      temperature: 32,
      apparentTemperature: 34,
      humidity: 45,
      windSpeed: 14,
      precipitation: 0,
      isDay: true,
      weatherCode: 0,
      conditionLabel: 'Ensolarado',
      iconName: 'sun',
      agriculturalAdvice:
        'Período propício para monitoramento da floração e colheita do caju precoce.',
      updatedAt: formatCurrentTime(),
      timestamp: Date.now(),
      isLive: false,
      isOffline: true,
    };
  },

  /**
   * Busca os dados meteorológicos ao vivo da Open-Meteo API.
   * Não requer chave de API, alta precisão, fuso horário do Piauí/Ceará.
   */
  async fetchLiveWeather(cityName = 'Piripiri - PI'): Promise<WeatherData> {
    const coords = getCityCoords(cityName);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=America%2FFortaleza`;

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erro na resposta da API meteorológica: ${response.status}`);
      }

      const json = await response.json();
      const current = json.current;

      const rawTemp = current.temperature_2m;
      const temp = Math.round(rawTemp * 10) / 10;
      const apparentTemp = Math.round((current.apparent_temperature ?? temp) * 10) / 10;
      const humidity = Math.round(current.relative_humidity_2m ?? 50);
      const windSpeed = Math.round((current.wind_speed_10m ?? 10) * 10) / 10;
      const precip = Number(current.precipitation ?? 0);
      const isDay = Boolean(current.is_day ?? 1);
      const weatherCode = Number(current.weather_code ?? 0);

      const condition = getWeatherCondition(weatherCode);
      const advice = generateAgriculturalAdvice(temp, humidity, precip, windSpeed);

      const weatherResult: WeatherData = {
        city: coords.name,
        temperature: temp,
        apparentTemperature: apparentTemp,
        humidity,
        windSpeed,
        precipitation: precip,
        isDay,
        weatherCode,
        conditionLabel: condition.label,
        iconName: condition.icon,
        agriculturalAdvice: advice,
        updatedAt: formatCurrentTime(),
        timestamp: Date.now(),
        isLive: true,
        isOffline: false,
      };

      // Grava em cache assincronamente para suporte a áreas rurais sem sinal
      await this.saveWeatherToCache(weatherResult);

      return weatherResult;
    } catch (error) {
      clearTimeout(timeoutId);
      // Fallback gracioso: tenta o cache do dispositivo
      const cached = await this.getCachedWeather();
      if (cached) {
        return {
          ...cached,
          city: coords.name,
          isLive: false,
          isOffline: true,
        };
      }

      // Se nem cache houver, usa o padrão local para nunca travar a UI (Zero Telas em Branco)
      return this.getFallbackWeather(coords.name);
    }
  },
};
