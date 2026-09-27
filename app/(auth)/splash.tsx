import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    let isMounted = true;

    // Garante um tempo visual mínimo (< 1.5s) da marca antes de transicionar
    const timer = setTimeout(() => {
      if (!isMounted) return;

      if (!isLoading) {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
      }
    }, 1200);

    // Timeout de resiliência (TEL-EST-01): Nunca travar em tela de carregamento após 3s
    const fallbackTimer = setTimeout(() => {
      if (!isMounted) return;
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [isLoading, isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <Feather name="feather" size={48} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>CajuTech</Text>
        <Text style={styles.tagline}>Cajucultura e Gestão no Semiárido</Text>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando ambiente...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 64,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#E8F5E9',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#E8F5E9',
    fontSize: 13,
    fontWeight: '500',
  },
});
