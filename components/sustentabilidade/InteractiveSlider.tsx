import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../constants/theme';
import { AccessiblePressable } from '../common/AccessiblePressable';

export interface InteractiveSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  testID?: string;
}

const PRESETS = [100, 500, 1000, 5000, 10000];

export const InteractiveSlider: React.FC<InteractiveSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100000,
  step = 50,
  unit = 'kg',
  testID,
}) => {
  const [inputText, setInputText] = useState(value.toString());
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<View>(null);

  // Sincroniza o texto caso o valor seja alterado externamente (ex: abas ou botões)
  useEffect(() => {
    setInputText(value.toString());
  }, [value]);

  const updateFromPosition = (pageXOrLocationX: number, isPageX: boolean = false) => {
    if (trackWidth <= 0) return;

    if (isPageX && trackRef.current && typeof trackRef.current.measure === 'function') {
      trackRef.current.measure((_x, _y, width, _height, pageX) => {
        const relativeX = Math.max(0, Math.min(width, pageXOrLocationX - pageX));
        const ratio = relativeX / width;
        const rawVal = ratio * (max - min) + min;
        const steppedVal = Math.round(rawVal / step) * step;
        const clampedVal = Math.min(max, Math.max(min, steppedVal));
        onChange(clampedVal);
      });
      return;
    }

    const clampedX = Math.max(0, Math.min(trackWidth, pageXOrLocationX));
    const ratio = clampedX / trackWidth;
    const rawVal = ratio * (max - min) + min;
    const steppedVal = Math.round(rawVal / step) * step;
    const clampedVal = Math.min(max, Math.max(min, steppedVal));
    onChange(clampedVal);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateFromPosition(evt.nativeEvent.locationX, false);
      },
      onPanResponderMove: (evt) => {
        updateFromPosition(evt.nativeEvent.pageX, true);
      },
    })
  ).current;

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const handleDecrement = () => {
    const delta = value > 2000 ? 500 : value > 500 ? 100 : 50;
    const newVal = Math.max(min, value - delta);
    onChange(newVal);
  };

  const handleIncrement = () => {
    const delta = value >= 2000 ? 500 : value >= 500 ? 100 : 50;
    const newVal = Math.min(max, value + delta);
    onChange(newVal);
  };

  const handleInputChange = (text: string) => {
    // Permite apenas dígitos numéricos (sem letras, negativos ou caracteres especiais)
    const cleaned = text.replace(/[^0-9]/g, '');
    setInputText(cleaned);

    if (cleaned === '') {
      onChange(0);
      return;
    }

    const numVal = parseInt(cleaned, 10);
    if (!isNaN(numVal)) {
      const clamped = Math.min(max, Math.max(min, numVal));
      onChange(clamped);
    }
  };

  const handleInputBlur = () => {
    setInputText(value.toString());
  };

  // Percentual para o slider (0 a 100%)
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  // Formatação de equivalência em toneladas
  const equivalenciaToneladas =
    value >= 1000
      ? `(${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value / 1000)} t)`
      : null;

  return (
    <View testID={testID} style={styles.container}>
      {/* Campo Numérico com Entrada Manual (RF-12) */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Quantidade colhida / processada:</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputBox}>
            <Feather name="edit-3" size={18} color={THEME.colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={handleInputChange}
              onBlur={handleInputBlur}
              keyboardType="numeric"
              maxLength={6}
              accessibilityLabel="Digitar quantidade colhida em quilos"
              accessibilityHint="Insira um valor numérico entre 0 e 100.000 kg"
              placeholder="0"
              placeholderTextColor={THEME.colors.textMuted}
            />
            <Text style={styles.unitBadge}>{unit}</Text>
          </View>
          {equivalenciaToneladas && (
            <Text style={styles.tonText}>{equivalenciaToneladas}</Text>
          )}
        </View>
      </View>

      {/* Slider Interativo com Botões (-) e (+) */}
      <View style={styles.sliderControlRow}>
        <AccessiblePressable
          onPress={handleDecrement}
          style={styles.stepButton}
          accessibilityLabel="Diminuir quantidade"
          accessibilityHint="Subtrai da quantidade atual"
          minTouchSize={THEME.dimensions.minTouchTarget}
        >
          <Feather name="minus" size={20} color={THEME.colors.primaryDark} />
        </AccessiblePressable>

        <View
          ref={trackRef}
          style={styles.trackContainer}
          onLayout={handleTrackLayout}
          {...panResponder.panHandlers}
        >
          {/* Trilho de Fundo */}
          <View style={styles.trackBackground} />

          {/* Trilho Preenchido */}
          <View style={[styles.trackFilled, { width: `${percentage}%` }]} />

          {/* Marcadores de Referência */}
          <View style={styles.markersContainer}>
            <View style={[styles.marker, { left: '1%' }]} />
            <View style={[styles.marker, { left: '25%' }]} />
            <View style={[styles.marker, { left: '50%' }]} />
            <View style={[styles.marker, { left: '75%' }]} />
            <View style={[styles.marker, { left: '99%' }]} />
          </View>

          {/* Indicador / Thumb do Slider */}
          <View
            style={[
              styles.thumb,
              {
                left: `${percentage}%`,
                transform: [{ translateX: -14 }],
              },
            ]}
          >
            <View style={styles.thumbCenter} />
          </View>
        </View>

        <AccessiblePressable
          onPress={handleIncrement}
          style={styles.stepButton}
          accessibilityLabel="Aumentar quantidade"
          accessibilityHint="Adiciona à quantidade atual"
          minTouchSize={THEME.dimensions.minTouchTarget}
        >
          <Feather name="plus" size={20} color={THEME.colors.primaryDark} />
        </AccessiblePressable>
      </View>

      {/* Botões Rápidos de Seleção (Presets) */}
      <View style={styles.presetsRow}>
        <Text style={styles.presetsLabel}>Atalhos rápidos:</Text>
        <View style={styles.presetsChips}>
          {PRESETS.map((presetVal) => {
            const isSelected = value === presetVal;
            const label =
              presetVal >= 1000 ? `${presetVal / 1000} t` : `${presetVal} kg`;
            return (
              <AccessiblePressable
                key={presetVal}
                onPress={() => onChange(presetVal)}
                style={[
                  styles.presetChip,
                  isSelected && styles.presetChipActive,
                ]}
                accessibilityLabel={`Definir para ${presetVal} kg`}
                minTouchSize={40}
              >
                <Text
                  style={[
                    styles.presetChipText,
                    isSelected && styles.presetChipTextActive,
                  ]}
                >
                  {label}
                </Text>
              </AccessiblePressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: THEME.dimensions.spacing.sm,
  },
  inputWrapper: {
    marginBottom: THEME.dimensions.spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME.colors.primary,
    borderRadius: THEME.dimensions.radius.md,
    paddingHorizontal: 12,
    minHeight: 48,
    minWidth: 170,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    paddingVertical: 6,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  unitBadge: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
    backgroundColor: '#F0F4EC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 6,
  },
  tonText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  sliderControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: THEME.dimensions.spacing.sm,
  },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(27, 94, 32, 0.2)',
  },
  trackContainer: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    position: 'relative',
  },
  trackBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E7DD',
    width: '100%',
  },
  trackFilled: {
    position: 'absolute',
    left: 0,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.primary,
  },
  markersContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    pointerEvents: 'none',
  },
  marker: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 1,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  thumbCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.primaryDark,
  },
  presetsRow: {
    marginTop: THEME.dimensions.spacing.sm,
    gap: 8,
  },
  presetsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  presetsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F4EC',
    borderWidth: 1,
    borderColor: '#D7E2D1',
  },
  presetChipActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primaryDark,
  },
  presetChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  presetChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
