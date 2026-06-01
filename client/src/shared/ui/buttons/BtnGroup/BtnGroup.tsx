import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Txt, TxtType } from '../../texts/Txt';
import { Box, BoxType } from '../../views/Box/Box';
import { Btn, BtnType } from '../Btn';

export type BtnGroupItem = {
  text: string;
  onPress: () => void;
  btnProps?: Omit<BtnType, 'text' | 'onPress'>;
  textProps?: TxtType;
};

export type BtnGroupType = {
  text?: string;
  textProps?: TxtType;
  boxProps?: BoxType;
  items?: BtnGroupItem[];
  itemBoxStyle?: StyleProp<ViewStyle>;
  itemProps?: {
    textProps?: TxtType;
    btnProps?: Omit<BtnType, 'text' | 'onPress'>;
  };
};

export function BtnGroup({
  text,
  items = [],
  textProps = {},
  itemBoxStyle = {},
  boxProps = {},
  itemProps = {},
}: BtnGroupType) {
  return (
    <Box {...boxProps}>
      {text && (
        <Txt isBold style={styles.title} {...textProps}>
          {text}
        </Txt>
      )}

      <View style={[styles.btnBox, itemBoxStyle]}>
        {items.map((item, index) => (
          <Btn
            key={`${item.text}-${index}`}
            text={item.text}
            onPress={item.onPress}
            variant="secondary"
            style={styles.btn}
            textProps={{
              size: 's',
              ...itemProps?.textProps,
              ...item.textProps,
            }}
            {...itemProps?.btnProps}
            {...item.btnProps}
          />
        ))}
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    marginBottom: 8,
  },
  btnBox: {
    gap: 6,
  },
  btn: {
    borderRadius: 12,
  },
});
