import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { appStyles, Colors } from '@/src/assets/tokens';
import ThemedText from './ThemedText';

export type InfoBadgeType = {
  name: string;
  style?: { box?: StyleProp<ViewStyle>; text?: StyleProp<TextStyle> };
};

export default function InfoBadge({ name, style = {} }: InfoBadgeType) {
  return (
    <View style={[styles.box, appStyles.shadow, style.box]}>
      <ThemedText title size={'s'} style={[styles.text, style.text]}>
        {name}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: Colors.bgBtn,
  },
  text: {
    color: Colors.textDark,
  },
});
