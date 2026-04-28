import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#7FA881',
  primaryPressed: '#618b63ff',
  danger: '#D72032',
  dangerPressed: '#b31524ff',
  titleDark: '#151515',
  textDark: '#15151599',
  label: '#B3B3B3',
  white: '#ffffff',
  black: '#000000',
  light: '#f5f5f5ff',
  bgBtn: '#F7F9F8',
  bgContainer: '#FDFDFD',
  bgLine: '#eeeeee',
  bgImage: '#F8FAF8',
  shadow: 'rgba(0, 0, 0, 0.4)',
  shadowLight: 'rgba(0, 0, 0, 0.2)',
  borderLight: '#D9D9D9',
  bgBadge: 'rgba(255, 255, 255, 0.25)',
};

export const appStyles = StyleSheet.create({
  box: {
    padding: 24,
    borderRadius: 26,
    backgroundColor: Colors.white,
  },

  boxS: {
    padding: 16,
    borderRadius: 26,
    backgroundColor: Colors.white,
  },

  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 10,
  },
});
