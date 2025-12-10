import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

export type TextSizeType = 'xs' | 's' | 'm' | 'l' | 'xl';

export type ThemedTextType = {
  title?: boolean;
  size?: TextSizeType;
  style?: StyleProp<TextStyle>;
  children?: ReactNode | ReactNode[];
} & TextProps;

export default function ThemedText({ title = false, size = 'm', style = {}, children, ...props }: ThemedTextType) {
  const textType = title ? styles.title : styles.text;
  return (
    <Text style={[styles.all, textType, styles[size], style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  all: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  title: { fontWeight: '500' },
  text: { fontWeight: '400' },
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
  s: { fontSize: 14, lineHeight: 16 },
  m: { fontSize: 16, lineHeight: 24 },
  l: { fontSize: 22, lineHeight: 28 },
  xl: { fontSize: 32, lineHeight: 40 },
});
