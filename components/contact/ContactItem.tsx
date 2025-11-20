import { ContactType } from "@/scripts/database/handlers/add-contact-db";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";
import { router } from "expo-router";

export default function ContactItem({ id, name }: ContactType) {
  const words = name.split(" ");
  const iconText =
    words.length < 2 ? name.slice(0, 2) : words[0][0] + words[1][0];

  return (
    <Pressable
      style={styles.item}
      onPress={() => router.push(`/profile/${id}`)}
    >
      <View style={styles.itemIcon}>
        <ThemedText size={"m"} title={true} style={styles.itemIconText}>
          {iconText.toUpperCase()}
        </ThemedText>
      </View>
      <ThemedText
        size={"m"}
        title={true}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.itemTitle}
      >
        {name}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 6,
    overflow: "hidden",
  },
  itemIcon: {
    width: 55,
    height: 55,
    backgroundColor: "#E4B571",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    color: "#151515",
    textAlign: "left",
    flexShrink: 1,
    minWidth: 0,
  },
});
