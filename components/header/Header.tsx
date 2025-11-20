import MaskedView from "@react-native-masked-view/masked-view";
import { StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";

export type HeaderType = {
  title: string;
};

export default function Header({ title }: HeaderType) {
  return (
    <View style={styles.header}>
      <View style={styles.headerBg} />
      <MaskedView
        style={styles.maskView}
        maskElement={
          <View style={styles.maskElementView}>
            <ThemedText size={"xl"}>{title.toUpperCase()}</ThemedText>
          </View>
        }
      >
        <View style={[styles.variable, { backgroundColor: "#ffffff" }]} />
        <View style={[styles.variable, { backgroundColor: "#86A788" }]} />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 140,
    marginBottom: -20,
  },
  headerBg: {
    height: 100,
    backgroundColor: "#86A788",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.05,
  },
  maskView: {
    flex: 1,
    height: "100%",
    marginTop: -40,
  },
  maskElementView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  variable: {
    flex: 1,
    height: "100%",
  },
});
