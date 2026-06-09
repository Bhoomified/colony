import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Colony brand colors
    primary: '#8B1A1A',
    primaryLight: '#B22222',
    primaryDark: '#5C1010',

    accent: '#E8871A',
    accentLight: '#F4A444',

    background: '#FAFAF8',
    backgroundElement: '#8B1A1A', // Maroon header
    backgroundSelected: '#F5F0EC',

    text: '#FFFFFF', // White text on maroon header
    textSecondary: '#E8D8C8',

    surface: '#FFFFFF',
    border: '#E8E0D8',
  },

  dark: {
    primary: '#8B1A1A',
    primaryLight: '#B22222',
    primaryDark: '#5C1010',

    accent: '#E8871A',
    accentLight: '#F4A444',

    background: '#121212',
    backgroundElement: '#5C1010',
    backgroundSelected: '#2A2A2A',

    text: '#FFFFFF',
    textSecondary: '#B0B4BA',

    surface: '#1E1E1E',
    border: '#333333',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'Arial',
    serif: 'Georgia',
    rounded: 'Arial',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset =
  Platform.select({ ios: 50, android: 80 }) ?? 0;

export const MaxContentWidth = 800;