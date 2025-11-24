import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/lib/store/hooks";

import BtnActionIconBox from "@/components/action/BtnActionIconBox";
import handleCopy from "@/scripts/handleCopyID";
import BtnActionTextBox from "@/components/action/BtnActionTextBox";

export default function Settings() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <BtnActionIconBox
        btnData={[
          {
            title: t("actions.copy"),
            source: require("@/assets/images/copy.png"),
            handle: handleCopy,
          },
        ]}
      />
      <BtnActionTextBox
        btnData={[
          {
            title: t("actions.rename"),
          },
          {
            title: t("actions.clear-chat"),
            styleText: styles.btnDander,
          },
          {
            title: t("actions.delete-contact"),
            styleText: styles.btnDander,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  headerBox: {
    height: 80,
    backgroundColor: "#86A788",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.05,
  },
  headerAvatar: {
    width: 100,
    height: 100,
    marginTop: -66,
    alignSelf: "center",
  },
  title: {
    marginTop: 22,
    marginBottom: 12,
    color: "#151515CC",
  },
  btnDander: {
    color: "#E41D30",
  },
});
