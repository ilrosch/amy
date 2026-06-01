export const COLORS = {
  primary: '#7FA881',
  secondary: '#E4B571',
  danger: '#D72032',
  white: '#ffffff',

  textMain: '#15151599',
  textHeader: '#151515',
  textSecondary: '#B3B3B3',
  textContrast: '#f5f5f5ff',

  borderSecondary: '#D9D9D9',

  bgMain: '#FDFDFD',
  bgSecondary: '#F8FAF8',
  bgOverlay: '#0000009d',
  bgDark: '#1d1d1d',

  shadow: '#00000020',
} as const;

export type ColorName = keyof typeof COLORS;
