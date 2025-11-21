import { FlatList, StyleProp, ViewStyle } from "react-native";
import BtnActionText, { BtnActionTextType } from "./BtnActionText";

const readerBtn = ({ item }: { item: BtnActionTextType }) => (
  <BtnActionText {...item} />
);

export type BtnActionTextBoxType = {
  btnData: BtnActionTextType[];
  styleBox?: StyleProp<ViewStyle>;
};

export default function BtnActionTextBox({
  btnData,
  styleBox,
}: BtnActionTextBoxType) {
  return (
    <FlatList
      data={btnData}
      renderItem={readerBtn}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={[{ gap: 8, marginTop: 20 }, styleBox]}
    />
  );
}
