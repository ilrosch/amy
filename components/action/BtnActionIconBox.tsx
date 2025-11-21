import { FlatList, StyleProp, ViewStyle } from "react-native";
import BtnActionIcon, { BtnActionIconType } from "./BtnActionIcon";
import SeparatorLine from "../SeparatorLine";

const readerBtn = ({ item }: { item: BtnActionIconType }) => (
  <BtnActionIcon {...item} />
);

export type BtnActionIconBoxType = {
  btnData: BtnActionIconType[];
  line?: boolean;
  styleBox?: StyleProp<ViewStyle>;
  styleLine?: StyleProp<ViewStyle>;
};

export default function BtnActionIconBox({
  btnData,
  line = true,
  styleBox,
  styleLine,
}: BtnActionIconBoxType) {
  return (
    <>
      <FlatList
        data={btnData}
        renderItem={readerBtn}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        contentContainerStyle={[
          {
            minWidth: "100%",
            justifyContent: "center",
            gap: 14,
          },
          styleBox,
        ]}
      />
      {line && (
        <SeparatorLine style={[{ backgroundColor: "#D9D9D9" }, styleLine]} />
      )}
    </>
  );
}
