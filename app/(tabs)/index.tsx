import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import handleCopy from "@/scripts/handleCopyID";

import BtnActionIconBox from "@/components/action/BtnActionIconBox";
import { useAppDispatch } from "@/lib/store/hooks";
import { openModal } from "@/lib/store/slices/modals";

export default function Chats() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <BtnActionIconBox
        btnData={[
          {
            title: t("actions.add-chat"),
            source: require("@/assets/images/add-chat.png"),
          },
          {
            title: t("actions.add-user"),
            source: require("@/assets/images/add-user.png"),
            handle: () => dispatch(openModal({ name: "add-contact" })),
          },
          {
            title: t("actions.copy"),
            source: require("@/assets/images/copy.png"),
            handle: handleCopy(),
          },
        ]}
      />
      <ScrollView style={styles.chats}>
        <Text style={styles.bage}>{t("infoMsg.noChats")}</Text>
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
