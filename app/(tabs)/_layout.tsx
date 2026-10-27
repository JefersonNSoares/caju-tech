import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { TabBar } from '../../components/navigation/TabBar';
import { WebSidebar } from '../../components/navigation/WebSidebar';
import { THEME } from '../../constants/theme';

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;

  return (
    <View style={styles.container}>
      {isDesktopWeb && <WebSidebar />}
      <View style={styles.tabContent}>
        <Tabs
          tabBar={(props) => (isDesktopWeb ? null : <TabBar {...props} />)}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Início',
            }}
          />
          <Tabs.Screen
            name="cultivo/index"
            options={{
              title: 'Cultivo',
            }}
          />
          <Tabs.Screen
            name="cultivo/plantio"
            options={{
              href: null,
              title: 'Plantio e Espaçamento',
            }}
          />
          <Tabs.Screen
            name="cultivo/irrigacao"
            options={{
              href: null,
              title: 'Irrigação e Recursos Hídricos',
            }}
          />
          <Tabs.Screen
            name="cultivo/poda"
            options={{
              href: null,
              title: 'Poda e Adubação',
            }}
          />
          <Tabs.Screen
            name="cultivo/pragas"
            options={{
              href: null,
              title: 'Controle de Pragas e Doenças',
            }}
          />
          <Tabs.Screen
            name="derivados/index"
            options={{
              title: 'Derivados',
            }}
          />
          <Tabs.Screen
            name="derivados/[id]"
            options={{
              href: null,
              title: 'Detalhes do Derivado',
            }}
          />
          <Tabs.Screen
            name="sustentabilidade/index"
            options={{
              title: 'Sustentabilidade',
            }}
          />
          <Tabs.Screen
            name="sustentabilidade/[id]"
            options={{
              href: null,
              title: 'Detalhes da Prática',
            }}
          />
          <Tabs.Screen
            name="sustentabilidade/simulador"
            options={{
              href: null,
              title: 'Simulador de Renda',
            }}
          />
          <Tabs.Screen
            name="recursos/index"
            options={{
              title: 'Recursos',
            }}
          />
          <Tabs.Screen
            name="recursos/quiz/index"
            options={{
              href: null,
              title: 'Quiz do Produtor',
            }}
          />
          <Tabs.Screen
            name="recursos/quiz/round"
            options={{
              href: null,
              title: 'Rodada do Quiz',
            }}
          />
          <Tabs.Screen
            name="recursos/quiz/result"
            options={{
              href: null,
              title: 'Resultado do Quiz',
            }}
          />
          <Tabs.Screen
            name="recursos/cartilha"
            options={{
              href: null,
              title: 'Cartilha Técnica Digital',
            }}
          />
          <Tabs.Screen
            name="recursos/midias"
            options={{
              href: null,
              title: 'Vídeos e Infográficos',
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: THEME.colors.background,
  },
  tabContent: {
    flex: 1,
  },
});
