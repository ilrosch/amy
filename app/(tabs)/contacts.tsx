import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import ActionButtonBox from "@/components/ActionButtonBox";
import SeparatorLine from "@/components/SeparatorLine";
import handleCopyID from "@/scripts/handleCopyID";

export default function Contacts() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ActionButtonBox
        buttons={[
          {
            title: t("actions.add-user"),
            source: require("@/assets/images/add-user.png"),
          },
          {
            title: t("actions.copy"),
            source: require("@/assets/images/copy.png"),
            handle: handleCopyID,
          },
        ]}
      />
      <SeparatorLine />
      <ScrollView style={styles.chats}>
        <Text style={styles.bage}>{t("chats.bage")}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  chats: {
    paddingVertical: 16,
  },
  bage: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#151515",
  },
});
