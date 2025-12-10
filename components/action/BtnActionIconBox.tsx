import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import BtnActionIcon, { BtnActionIconType } from './BtnActionIcon';
import { Colors } from '@/assets/tokens';

const readerBtn = ({ item }: { item: BtnActionIconType }) => <BtnActionIcon {...item} />;

export type BtnActionIconBoxType = {
  btnData: BtnActionIconType[];
  styleBox?: StyleProp<ViewStyle>;
};

export default function BtnActionIconBox({ btnData, styleBox }: BtnActionIconBoxType) {
  return (
    <View>
      <FlatList
        data={btnData}
        renderItem={readerBtn}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        contentContainerStyle={[
          {
            minWidth: '100%',
            borderRadius: 10,
            backgroundColor: Colors.white,
            paddingHorizontal: 12,
            justifyContent: 'center',
            gap: 14,
          },
          styleBox,
        ]}
      />
    </View>
  );
}
