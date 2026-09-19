import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from '../common/AccessiblePressable';

const TAB_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
  index: 'home',
  cultivo: 'feather',
  derivados: 'package',
  sustentabilidade: 'bar-chart-2',
  recursos: 'book-open',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Início',
  cultivo: 'Cultivo',
  derivados: 'Derivados',
  sustentabilidade: 'Sustentabilidade',
  recursos: 'Recursos',
};

export const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const baseName = route.name.split('/')[0];
        const label = TAB_LABELS[baseName] || options.title || route.name;
        const iconName = TAB_ICONS[baseName] || 'circle';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const color = isFocused ? THEME.colors.primary : THEME.colors.textMuted;

        return (
          <AccessiblePressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={label}
            testID={options.tabBarButtonTestID || `tab-${route.name}`}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Feather name={iconName} size={22} color={color} />
            <Text
              style={[
                styles.tabLabel,
                { color },
                isFocused && styles.tabLabelFocused,
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </AccessiblePressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingBottom: 6,
    paddingTop: 4,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    minHeight: 52,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
});
