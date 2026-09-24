import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { UserRole } from '../../types/user';
import { Card } from '../../components/common/Card';
import { AccessiblePressable } from '../../components/common/AccessiblePressable';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

interface ProfileOption {
  role: UserRole;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
}

const PROFILES: ProfileOption[] = [
  {
    role: 'farmer',
    title: 'Agricultor / Produtor Rural',
    description: 'Acesso a orientações de manejo, alertas fitossanitários e cotações de mercado.',
    icon: 'user-check',
  },
  {
    role: 'student',
    title: 'Estudante / Extensionista',
    description: 'Cartilha técnica completa, materiais didáticos, quiz interativo e infográficos.',
    icon: 'book',
  },
  {
    role: 'visitor',
    title: 'Visitante / Consumidor',
    description: 'Receitas com caju, história da cajucultura e valor nutricional dos derivados.',
    icon: 'heart',
  },
];

export default function LoginScreen() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [displayName, setDisplayName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleContinue = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await login(selectedRole, displayName);
      router.replace('/(tabs)');
    } catch (err) {
      console.warn('Erro ao salvar identificação local:', err);
      // Fallback gracioso para garantir usabilidade rural direta sem travar o app
      router.replace('/(tabs)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Como você quer utilizar o CajuTech?</Text>
        <Text style={styles.subtitle}>
          Selecione seu perfil para ajustarmos as recomendações e conteúdos.
        </Text>
      </View>

      <View style={styles.profilesList} accessibilityRole="radiogroup">
        {PROFILES.map((profile) => {
          const isSelected = selectedRole === profile.role;

          return (
            <AccessiblePressable
              key={profile.role}
              onPress={() => setSelectedRole(profile.role)}
              style={styles.pressableItem}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              accessibilityLabel={`Selecionar perfil: ${profile.title}. ${profile.description}`}
              minTouchSize={48}
            >
              <Card
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                ]}
              >
                <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
                  <Feather
                    name={profile.icon}
                    size={24}
                    color={isSelected ? '#FFFFFF' : THEME.colors.primary}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.profileTitle, isSelected && styles.profileTitleSelected]}>
                    {profile.title}
                  </Text>
                  <Text style={styles.profileDescription}>{profile.description}</Text>
                </View>
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </Card>
            </AccessiblePressable>
          );
        })}
      </View>

      {/* Campo de Nome / Apelido Opcional */}
      <View style={styles.inputSection}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>Seu Nome ou Apelido (Opcional)</Text>
          <Text style={styles.charCounter}>{displayName.length}/40</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Ex: Seu Raimundo, Maria do Caju..."
          placeholderTextColor={THEME.colors.textMuted}
          maxLength={40}
          autoCapitalize="words"
          autoCorrect={false}
          accessibilityLabel="Campo de texto para nome ou apelido de identificação"
          accessibilityHint="Informe como deseja ser chamado na aplicação"
        />
        <Text style={styles.inputHelp}>
          Se deixar em branco, usaremos a identificação padrão para o seu perfil.
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <Button
          label={isSubmitting ? 'Entrando...' : 'Continuar para a Aplicação'}
          onPress={handleContinue}
          size="lg"
          fullWidth
          disabled={isSubmitting}
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
    padding: THEME.dimensions.spacing.lg,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: THEME.dimensions.spacing.xl,
  },
  header: {
    marginBottom: THEME.dimensions.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  profilesList: {
    gap: 16,
    marginBottom: THEME.dimensions.spacing.lg,
  },
  pressableItem: {
    width: '100%',
    minHeight: 48,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.dimensions.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 64,
  },
  cardSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#F1F8F2',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainerSelected: {
    backgroundColor: THEME.colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  profileTitleSelected: {
    color: THEME.colors.primaryDark,
  },
  profileDescription: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: THEME.colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  radioCircleSelected: {
    borderColor: THEME.colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.colors.primary,
  },
  inputSection: {
    marginBottom: THEME.dimensions.spacing.xl,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  charCounter: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  textInput: {
    minHeight: 48,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: THEME.dimensions.radius.md,
    paddingHorizontal: THEME.dimensions.spacing.md,
    fontSize: 16,
    color: THEME.colors.textPrimary,
  },
  inputHelp: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 6,
    lineHeight: 16,
  },
  actionContainer: {
    marginTop: THEME.dimensions.spacing.xs,
    marginBottom: THEME.dimensions.spacing.xl,
  },
});
