import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

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
