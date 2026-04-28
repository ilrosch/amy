import { ComponentType } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Colors } from '@/src/assets/tokens';

import ThemedText from '../shared/ThemedText';

export type BtnActionIconType = {
  Icon: ComponentType<SvgProps>;
  title?: string;
  style?: ViewStyle | ViewStyle[];
  handle?: () => void;
};

export default function BtnActionIcon({ Icon, style, title, handle }: BtnActionIconType) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, style, pressed && styles.buttonPressed]}
      onPress={handle}
    >
      <View style={styles.iconBox}>
        <Icon color={Colors.textDark} width={24} height={24} />
      </View>
      <ThemedText title={true} size={'s'} style={styles.buttonText}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 95,
    paddingVertical: 12,
    gap: 4,
  },
  buttonPressed: {},
  iconBox: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.light,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: Colors.textDark,
  },
});
