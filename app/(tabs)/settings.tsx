import ActionButtonBox from "@/components/ActionButtonBox";
import SeparatorLine from "@/components/SeparatorLine";
import handleCopyID from "@/scripts/handleCopyID";
import { useAppSelector } from "@/lib/store/hooks";
import { selectUserID, selectUserName } from "@/lib/store/slices/auth";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const { t } = useTranslation();
  const uuid = useAppSelector(selectUserID);
  const name = useAppSelector(selectUserName);

  return (
    <View style={styles.container}>
      <ActionButtonBox
        buttons={[
          {
            title: t("actions.copy"),
            source: require("@/assets/images/copy.png"),
            handle: handleCopyID,
          },
        ]}
      />
      <SeparatorLine />
      <ScrollView style={styles.chats}>
        <Text style={styles.bage}>Привет, {name}!</Text>
        <Text style={styles.bage}>ID: {uuid}</Text>
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
