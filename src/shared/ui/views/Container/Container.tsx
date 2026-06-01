import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { styles } from './Container.style';

export type ContainerType = {
  style?: StyleProp<ViewStyle>;
} & ViewProps;

export function Container({ style = {}, ...props }: ContainerType) {
  return <View style={[styles.container, style]} {...props} />;
}
