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
            name="derivados/index"
            options={{
              title: 'Derivados',
            }}
          />
          <Tabs.Screen
            name="sustentabilidade/index"
            options={{
              title: 'Sustentabilidade',
            }}
          />
          <Tabs.Screen
            name="recursos/index"
            options={{
              title: 'Recursos',
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
