import MaskedView from "@react-native-masked-view/masked-view";
import { StyleSheet, Text, View } from "react-native";

type HeaderType = {
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
            <Text style={styles.title}>{title.toUpperCase()}</Text>
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
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  maskView: {
    flex: 1,
    height: "100%",
    marginTop: -45,
  },
  maskElementView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 40,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "center",
  },
  variable: {
    flex: 1,
    height: "100%",
  },
});
