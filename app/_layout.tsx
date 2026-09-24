import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { OfflineBanner } from '../components/feedback/OfflineBanner';
import { THEME } from '../constants/theme';

export default function RootLayout() {
  const { isOffline } = useNetworkStatus();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" backgroundColor={THEME.colors.background} />
        {isOffline && (
          <OfflineBanner message="Sinal ausente — navegando com dados salvos" />
        )}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    flex: 1,
  },
});
