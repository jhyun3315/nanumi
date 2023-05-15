export const COLORS = {
  primary: '#001F2D',
  secondary: '#4D626C',
  white: '#FFF',
  gray: '#74858C',
  violet: '#8B5CF6',
  lightViolet: '#C4B5FD',
  disable: '#D1BEFB',
  lightBlue: '#eff6ff',
  blue: '#1F41BB',
  opacityBlue: '#9AA7D5',
  lightGray: '#F0F0F0',
  red: '#F87171',
  yellow: '#E0C134',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const FONTS = {
  bold: 'GmarketSansTTFBold',
  medium: 'GmarketSansTTFMedium',
  light: 'GmarketSansTTFLight',
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
