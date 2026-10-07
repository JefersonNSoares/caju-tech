import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../constants/theme';
import { Card } from '../../../components/common/Card';
import { AccessiblePressable } from '../../../components/common/AccessiblePressable';

interface StageNavItem {
  id: 'plantio' | 'irrigacao' | 'poda' | 'pragas';
  number: string;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  badge: string;
}

const CULTIVO_STAGES: StageNavItem[] = [
  {
    id: 'plantio',
    number: '01',
    title: 'Plantio e Espaçamento',
    description: 'Preparo do solo, coveamento e espaçamento recomendado para cajueiro-anão precoce.',
    icon: 'target',
    badge: 'Implantação',
  },
  {
    id: 'irrigacao',
    number: '02',
    title: 'Irrigação e Recursos Hídricos',
    description: 'Manejo de água em clima semiárido, gotejamento e microaspersão eficiente.',
    icon: 'droplet',
    badge: 'Eficiência Hídrica',
  },
  {
    id: 'poda',
    number: '03',
    title: 'Poda e Adubação',
    description: 'Poda de formação, limpeza fitossanitária e adubação orgânica e química equilibrada.',
    icon: 'scissors',
    badge: 'Manejo Produtivo',
  },
  {
    id: 'pragas',
    number: '04',
    title: 'Controle de Pragas e Doenças',
    description: 'Identificação e controle de traça-das-castanhas, broca-das-pontas e antracnose.',
    icon: 'shield',
    badge: 'Sanidade Vegetal',
  },
];

export default function CultivoScreen() {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    router.push(`/(tabs)/cultivo/${id}` as any);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      className="flex-1 bg-[#F9FBF7]"
    >
      {/* Container responsivo com largura controlada para mobile e desktop PC */}
      <View className="w-full max-w-2xl mx-auto flex flex-col">
        {/* Header da Tela de Cultivo */}
        <View style={styles.header} className="mb-6">
          <View style={styles.moduleBadge} className="self-start">
            <Feather name="feather" size={13} color={THEME.colors.primary} />
            <Text style={styles.moduleBadgeText}>MÓDULO DE CULTIVO</Text>
          </View>
          <Text style={styles.title} className="text-2xl font-extrabold text-[#0E3A13] mt-2">
            Manejo Agronômico do Cajueiro
          </Text>
          <Text style={styles.subtitle} className="text-sm text-[#4B5563] mt-1.5 leading-5">
            Selecione uma das etapas abaixo para acessar orientações técnicas práticas e vídeos
            educativos explicativos desenvolvidos para o semiárido.
          </Text>
        </View>

        {/* Lista de botões alinhados verticalmente (um embaixo do outro) */}
        <View style={styles.verticalList} className="flex flex-col gap-3.5 w-full">
          {CULTIVO_STAGES.map((stage) => (
            <AccessiblePressable
              key={stage.id}
              testID={`cultivo-btn-${stage.id}`}
              onPress={() => handleNavigate(stage.id)}
              style={styles.pressableItem}
              accessibilityRole="button"
              accessibilityLabel={`Fase ${stage.number}: ${stage.title}. Toque para abrir detalhes e vídeos.`}
            >
              <Card style={styles.card} className="w-full">
                {/* Indicador numérico e ícone */}
                <View style={styles.iconCircle}>
                  <Feather name={stage.icon} size={22} color={THEME.colors.primary} />
                </View>

                {/* Conteúdo textual central */}
                <View style={styles.textContainer} className="flex-1">
                  <View style={styles.badgeRow}>
                    <Text style={styles.stageNumber}>ETAPA {stage.number}</Text>
                    <View style={styles.stageBadgePill}>
                      <Text style={styles.stageBadgeText}>{stage.badge}</Text>
                    </View>
                  </View>
                  <Text style={styles.itemTitle}>{stage.title}</Text>
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {stage.description}
                  </Text>
                </View>

                {/* Seta indicativa de navegação */}
                <View style={styles.chevronContainer}>
                  <Feather name="chevron-right" size={22} color={THEME.colors.primary} />
                </View>
              </Card>
            </AccessiblePressable>
          ))}
        </View>

        {/* Rodapé informativo de boas práticas */}
        <View style={styles.footerInfo} className="mt-6 flex-row items-center gap-2">
          <Feather name="info" size={15} color={THEME.colors.textMuted} />
          <Text style={styles.footerInfoText}>
            Recomendações técnicas embasadas na cultura do cajueiro-anão precoce.
          </Text>
        </View>
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
    padding: THEME.dimensions.spacing.md,
    paddingBottom: THEME.dimensions.spacing.xxl,
  },
  header: {
    marginBottom: THEME.dimensions.spacing.md,
  },
  moduleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.dimensions.radius.sm,
  },
  moduleBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.primaryDark,
  },
  subtitle: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    lineHeight: 20,
  },
  verticalList: {
    gap: 14,
  },
  pressableItem: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.dimensions.spacing.md,
    borderRadius: THEME.dimensions.radius.lg,
    backgroundColor: THEME.colors.surfaceCard,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  stageNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.primary,
    letterSpacing: 0.5,
  },
  stageBadgePill: {
    backgroundColor: '#F5F0E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stageBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.earthBrown,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
  chevronContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  footerInfo: {
    paddingHorizontal: 4,
  },
  footerInfoText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 16,
  },
});
