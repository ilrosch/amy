import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import ActionButtonBox from "@/components/ActionButtonBox";
import SeparatorLine from "@/components/SeparatorLine";
import handleCopyID from "@/scripts/handleCopyID";
import { useState } from "react";
import ModalCustom from "@/components/Modal";
import handleCreateAccount from "@/scripts/handleAddContact";

export default function Chats() {
  const { t } = useTranslation();

  const [showAddContact, setShowAddContact] = useState<boolean>(false);
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <ActionButtonBox
        buttons={[
          {
            title: t("actions.add-chat"),
            source: require("@/assets/images/add-chat.png"),
          },
          {
            title: t("actions.add-user"),
            source: require("@/assets/images/add-user.png"),
            handle: () => setShowAddContact(true),
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
        {showAddContact && (
          <ModalCustom
            title={t("modal.add-contact")}
            text={t("modal.add-contact-text")}
            line={true}
            handleClose={() => setShowAddContact(false)}
          >
            <View style={styles.form}>
              <View style={styles.field}>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  placeholder={t("welcome.label")}
                  value={name}
                />
                {/* {error && <Text style={styles.error}>{error}</Text>} */}
              </View>
              <Pressable
                style={styles.button}
                onPress={() => handleCreateAccount}
              >
                <Text style={styles.buttonText}>{t("welcome.button")}</Text>
              </Pressable>
            </View>
          </ModalCustom>
        )}
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
  input: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(217, 217, 217, 1.0)",
    paddingVertical: 12,
    paddingHorizontal: 16,

    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    color: "#1E1E1E",
  },
  error: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#E41D30",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#86A788",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
