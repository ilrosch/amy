import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { type ColorName, COLORS } from '@/shared/config/theme';
import { styles } from './Txt.style';

export type TxtSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TxtType = {
  color?: ColorName;
  isBold?: boolean;
  size?: TxtSize;
  style?: StyleProp<TextStyle>;
} & TextProps;

export function Txt({
  color = 'textMain',
  isBold = false,
  size = 'm',
  style = {},
  ...props
}: TxtType) {
  const txtStyle = [
    styles.text,
    styles[size],
    isBold && styles.bold,
    { color: COLORS[color] },
    style,
  ];

  return <Text style={txtStyle} {...props} />;
}
