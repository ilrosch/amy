import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { appStyles, Colors } from '@/src/assets/tokens';
import ThemedText from '../shared/ThemedText';
import BtnText, { BtnTextType } from './BtnText';

export type BtnGroupType = {
  name: string;
  btns: BtnTextType[];
  style?: { box?: StyleProp<ViewStyle>; btn?: StyleProp<ViewStyle>; title?: StyleProp<TextStyle> };
};

export default function BtnGroup({ name, btns, style = {} }: BtnGroupType) {
  return (
    <View style={[appStyles.box, appStyles.shadow, style?.box]}>
      <ThemedText title style={[styles.title, style?.title]}>
        {name}
      </ThemedText>
      <View style={styles.boxContent}>
        {btns.map((btn, i) => (
          <BtnText key={`btn-${i}`} {...btn} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: Colors.light,
    color: Colors.titleDark,
  },
  boxContent: {
    marginTop: 12,
    gap: 6,
  },
});
