import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from '../common/AccessiblePressable';

interface NavItem {
  name: string;
  route: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'index', route: '/', label: 'Início', icon: 'home' },
  { name: 'cultivo', route: '/cultivo', label: 'Cultivo', icon: 'feather' },
  { name: 'derivados', route: '/derivados', label: 'Derivados', icon: 'package' },
  { name: 'sustentabilidade', route: '/sustentabilidade', label: 'Sustentabilidade', icon: 'bar-chart-2' },
  { name: 'recursos', route: '/recursos', label: 'Recursos', icon: 'book-open' },
];

export const WebSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandContainer}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>CT</Text>
        </View>
        <Text style={styles.brandTitle}>CajuTech</Text>
      </View>

      <View style={styles.navGroup}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.route === '/'
              ? pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/'
              : pathname.includes(item.name);

          return (
            <AccessiblePressable
              key={item.name}
              onPress={() => router.push(item.route as any)}
              style={[styles.navItem, isActive && styles.navItemActive]}
              accessibilityLabel={item.label}
            >
              <Feather
                name={item.icon}
                size={20}
                color={isActive ? '#FFFFFF' : THEME.colors.textSecondary}
              />
              <Text
                style={[
                  styles.navLabel,
                  isActive ? styles.navLabelActive : styles.navLabelInactive,
                ]}
              >
                {item.label}
              </Text>
            </AccessiblePressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: THEME.colors.surface,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.08)',
    paddingVertical: THEME.dimensions.spacing.lg,
    paddingHorizontal: THEME.dimensions.spacing.md,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.dimensions.spacing.xl,
    paddingHorizontal: THEME.dimensions.spacing.xs,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.colors.primaryDark,
  },
  navGroup: {
    gap: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: THEME.dimensions.radius.md,
    minHeight: 48,
    minWidth: 48,
  },
  navItemActive: {
    backgroundColor: THEME.colors.primary,
  },
  navLabel: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  navLabelInactive: {
    color: THEME.colors.textSecondary,
  },
});
