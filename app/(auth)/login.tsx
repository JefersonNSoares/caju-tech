import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { UserRole } from '../../types/user';
import { Card } from '../../components/common/Card';
import { AccessiblePressable } from '../../components/common/AccessiblePressable';
import { Button } from '../../components/common/Button';

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
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Como você quer utilizar o CajuTech?</Text>
        <Text style={styles.subtitle}>
          Selecione seu perfil para ajustarmos as recomendações e conteúdos.
        </Text>
      </View>

      <View style={styles.profilesList}>
        {PROFILES.map((profile) => {
          const isSelected = selectedRole === profile.role;

          return (
            <AccessiblePressable
              key={profile.role}
              onPress={() => setSelectedRole(profile.role)}
              style={styles.pressableItem}
              accessibilityLabel={`Selecionar perfil: ${profile.title}`}
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

      <View style={styles.actionContainer}>
        <Button
          label="Continuar para a Aplicação"
          onPress={handleContinue}
          size="lg"
          fullWidth
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
    marginBottom: THEME.dimensions.spacing.xl,
  },
  pressableItem: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.dimensions.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
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
  actionContainer: {
    marginTop: THEME.dimensions.spacing.md,
  },
});
