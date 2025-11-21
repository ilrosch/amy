import { StyleSheet, View, ViewStyle } from "react-native";

import ActionButton, { ActionButtonProps } from "./BtnActionIcon";
import SeparatorLine from "../SeparatorLine";

type ActionButtonBoxType = {
  buttons: ActionButtonProps[];
  style?: ViewStyle | ViewStyle[];
};

export default function ActionButtonBox({
  buttons,
  style,
}: ActionButtonBoxType) {
  return (
    <>
    <View style={[styles.actions, style]}>
      {buttons.map((btn) => (
        <ActionButton
          key={`button-${btn.title}`}
          title={btn.title}
          source={btn.source}
          handle={btn.handle}
        />
      ))}
    </View>
      <SeparatorLine style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 14,
  },
  line: {
    backgroundColor: "#D9D9D9",
  },
});
