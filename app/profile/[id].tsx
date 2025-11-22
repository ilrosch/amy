import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/lib/store/hooks";
import { selectContact } from "@/lib/store/slices/contacts";

import { ContactType } from "@/scripts/database/handlers/add-contact-db";
import handleCopy from "@/scripts/handleCopyID";

import Avatar from "@/components/Avatar";
import ThemedText from "@/components/ThemedText";
import BtnActionIconBox from "@/components/action/BtnActionIconBox";
import BtnActionTextBox from "@/components/action/BtnActionTextBox";
import RenameContactModal from "@/components/modal/RenameContactModal";
import { useState } from "react";

export default function Profile() {
  const { t } = useTranslation();
  const [showRenameContactModal, setShowRenameContactModal] =
    useState<boolean>(false);

  const currentParams = useLocalSearchParams<ContactType>();
  const currentUser = useAppSelector((state) =>
    selectContact(state, currentParams.id)
  );

  return (
    <>
      <View>
        <View style={styles.headerBox} />
        <Avatar
          name={currentUser.name}
          sizeText={"l"}
          styleBox={styles.headerAvatar}
        />
        <View style={styles.container}>
          <ThemedText size={"l"} title={true} style={styles.title}>
            {currentUser.name}
          </ThemedText>
          <BtnActionIconBox
            btnData={[
              {
                title: t("actions.add-chat"),
                source: require("@/assets/images/add-chat.png"),
              },
              {
                title: t("actions.call"),
                source: require("@/assets/images/call.png"),
              },
              {
                title: t("actions.copy"),
                source: require("@/assets/images/copy.png"),
                handle: handleCopy(currentUser.id),
              },
            ]}
          />
          <BtnActionTextBox
            btnData={[
              {
                title: t("actions.rename"),
                handle: () => setShowRenameContactModal(true),
              },
              { title: t("actions.clear-chat"), styleText: styles.btnDander },
              {
                title: t("actions.delete-contact"),
                styleText: styles.btnDander,
              },
            ]}
          />
        </View>
      </View>

      <RenameContactModal
        visible={showRenameContactModal}
        setVisible={setShowRenameContactModal}
        currentName={currentUser.name}
        currentID={currentUser.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
