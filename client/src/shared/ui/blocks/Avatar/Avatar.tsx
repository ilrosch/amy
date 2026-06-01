import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { Txt, TxtType } from '../../texts/Txt';
import { styles } from './Avatar.style';
import { useCallback } from 'react';

export type AvatarType = {
  text: string;
  style?: StyleProp<ViewStyle>;
  textProps?: TxtType;
} & ViewProps;

export function Avatar({ text, style = {}, textProps = {}, ...props }: AvatarType) {
  const getABBR = useCallback((v: string) => {
    if (!v || !v.trim()) return '';
    const words = v.toUpperCase().split(' ');
    return words.length < 2 ? `${words[0][0]}${words[0][1]}` : `${words[0][0]}${words[1][0]}`;
  }, []);

  return (
    <View style={[styles.box, style]} {...props}>
      <Txt size="m" isBold {...textProps}>
        {getABBR(text)}
      </Txt>
    </View>
  );
}

// import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
// import ThemedText, { TextSizeType } from './ThemedText';

// export type AvatarType = {
//   name: string;
//   sizeText?: TextSizeType;
//   styleBox?: StyleProp<ViewStyle>;
//   styleText?: StyleProp<TextStyle>;
// };

// export default function Avatar({ name, sizeText, styleBox, styleText }: AvatarType) {
//   const words = name.split(' ');
//   const text = words.length < 2 ? name.slice(0, 2) : words[0][0] + words[1][0];

//   return (
//     <View style={[styles.avatar, styleBox]}>
//       <ThemedText title={true} size={sizeText} style={[styles.avatarText, styleText]}>
//         {text.toUpperCase()}
//       </ThemedText>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   avatar: {
//     width: 55,
//     height: 55,
//     backgroundColor: '#E4B571',
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarText: {
//     color: '#151515',
//   },
// });
