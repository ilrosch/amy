import { FlatList, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import handleCopyID from "@/scripts/handleCopyID";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectAllContacts } from "@/lib/store/slices/contacts";
import { ContactType } from "@/scripts/database/handlers/add-contact-db";

import ThemedText from "@/components/ThemedText";
import ContactItem from "@/components/contact/ContactItem";
import BtnActionIconBox from "@/components/action/BtnActionIconBox";
import { openModal } from "@/lib/store/slices/modals";

export default function Contacts() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const contactItems = useAppSelector(selectAllContacts);

  const renderContactItem = ({ item }: { item: ContactType }) => (
    <ContactItem id={item.id} name={item.name} />
  );

  return (
    <View style={styles.container}>
      <BtnActionIconBox
        btnData={[
          {
            title: t("actions.add-user"),
            source: require("@/assets/images/add-user.png"),
            handle: () => dispatch(openModal({ name: "add-contact" })),
          },
          {
            title: t("actions.copy"),
            source: require("@/assets/images/copy.png"),
            handle: handleCopyID(),
          },
        ]}
      />

      {contactItems.length ? (
        <FlatList
          data={contactItems}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          style={styles.contactBox}
        />
      ) : (
        <ThemedText style={styles.infoMsg}>
          {t("infoMsg.noContacts")}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  line: {
    backgroundColor: "#D9D9D9",
  },
  contactBox: {
    paddingHorizontal: 12,
    marginBottom: 100,
  },
  infoMsg: {
    color: "#151515",
  },
});
