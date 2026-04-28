import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import ThemedText, { TextSizeType } from '../ThemedText';
import { Colors } from '@/src/assets/tokens';
import { usePressBtn } from '@/src/hooks/animations/use-press-btn';

export type BtnRoundedType = {
  name: string;
  bold?: boolean;
  type?: 'primary' | 'danger' | 'outWhite' | 'outDanger';
  size?: TextSizeType;
  style?: {
    box?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
} & PressableProps;

const mapping = {
  primary: 'textWhite',
  danger: 'textWhite',
  outWhite: 'textDark',
  outDanger: 'textDanger',
} as const;

export default function BtnRounded({
  name,
  onPress,
  bold = false,
  type = 'primary',
  size = 'm',
  style = {},
  ...props
}: BtnRoundedType) {
  const { animStyle, handlers } = usePressBtn();

  return (
    <Animated.View style={animStyle}>
      <Pressable
        onPress={onPress}
        style={[styles.box, styles[type], style.box]}
        {...handlers}
        {...props}
      >
        <ThemedText title={bold} size={size} style={[styles[mapping[type]], style.text]}>
          {name}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    borderRadius: 100,
  },
  textWhite: {
    color: Colors.white,
  },
  textDark: {
    color: Colors.textDark,
  },
  textDanger: {
    color: Colors.danger,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  outWhite: {
    borderWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.label,
    backgroundColor: Colors.white,
    padding: 14,
  },
  outDanger: {
    borderWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.danger,
    backgroundColor: Colors.white,
    padding: 14,
  },
});
