import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";
import { HeaderType } from "./Header";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HeaderSecondary({ title }: HeaderType) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: top }]}>
      <Pressable
        onPress={router.back}
        style={({ pressed }) => [styles.headerBtn]}
      >
        <Image source={require("@/assets/images/back.png")} alt="back" />
      </Pressable>

      <ThemedText title={true} style={styles.headerTitle}>
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#86A788",
  },
  headerBtn: {
    padding: 12,
  },
  headerTitle: {
    color: "#ffffff",
  },
});
