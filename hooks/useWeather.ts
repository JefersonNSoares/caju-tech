import { useState, useEffect, useCallback, useRef } from 'react';
import { WeatherData } from '../types/weather';
import { weatherService } from '../services/weatherService';

export function useWeather(cityName = 'Piripiri - PI') {
  const [weather, setWeather] = useState<WeatherData>(() =>
    weatherService.getFallbackWeather(cityName)
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const isMounted = useRef<boolean>(true);

  const fetchWeather = useCallback(async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      // Carrega imediatamente do cache se não for atualização manual forçada
      if (!isManual) {
        const cached = await weatherService.getCachedWeather();
        if (cached && isMounted.current) {
          setWeather(cached);
        }
      }

      // Busca dados meteorológicos ao vivo da API em tempo real
      const live = await weatherService.fetchLiveWeather(cityName);
      if (isMounted.current) {
        setWeather(live);
      }
    } catch {
      // Silenciosamente mantido; weatherService já provê resiliência
    } finally {
      if (isMounted.current) {
        setLoading(false);
        setIsRefreshing(false);
      }
    }
  }, [cityName]);

  useEffect(() => {
    isMounted.current = true;
    fetchWeather(false);

    // Atualiza automaticamente a cada 10 minutos (600.000 ms) se o app estiver aberto
    const intervalId = setInterval(() => {
      fetchWeather(false);
    }, 600000);

    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, [fetchWeather]);

  const refresh = useCallback(async () => {
    await fetchWeather(true);
  }, [fetchWeather]);

  return {
    weather,
    loading,
    isRefreshing,
    refresh,
  };
}
