import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { THEME } from '../../constants/theme';
import { CajuTechLogo } from '../../components/common/CajuTechLogo';
import { Button } from '../../components/common/Button';

export default function SplashScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          {/* 1. Logótipo oficial do CajuTech no centro */}
          <View style={styles.logoWrapper}>
            <CajuTechLogo size="xl" showPlaceholderLabel={true} showTagline={true} />
          </View>

          {/* 2. Texto explicativo abaixo do logo */}
          <Text style={styles.explanationText}>
            Aplicativo educativo sobre o cultivo do caju e o aproveitamento de seus derivados
          </Text>

          {/* 3. Botão verde de ação "INICIAR" */}
          <View style={styles.actionWrapper}>
            <Button
              label="INICIAR"
              onPress={handleStart}
              variant="primary"
              size="lg"
              fullWidth
              testID="btn-iniciar"
            />
          </View>
        </View>

        {/* Rodapé com identidade de fomento e pesquisa */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>Tecnologia & Extensão Rural para o Semiárido</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: THEME.dimensions.spacing.lg,
  },
  contentCard: {
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.dimensions.spacing.xl,
    paddingHorizontal: THEME.dimensions.spacing.md,
  },
  logoWrapper: {
    marginBottom: THEME.dimensions.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationText: {
    fontSize: 16,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: THEME.dimensions.spacing.xxl,
    paddingHorizontal: THEME.dimensions.spacing.sm,
    fontWeight: '500',
  },
  actionWrapper: {
    width: '100%',
    paddingHorizontal: THEME.dimensions.spacing.sm,
  },
  footerNote: {
    marginTop: THEME.dimensions.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
