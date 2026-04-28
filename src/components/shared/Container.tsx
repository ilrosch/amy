import { Colors } from '@/src/assets/tokens';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

export type ContainerType = {
  style?: StyleProp<ViewStyle>;
} & ViewProps;

export default function Container({ style = {}, ...props }) {
  return <View style={[styles.box, style]} {...props} />;
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    zIndex: 10,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.bgContainer,
    overflow: 'hidden',
  },
});
