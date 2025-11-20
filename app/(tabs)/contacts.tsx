import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import ActionButtonBox from "@/components/ActionButtonBox";
import SeparatorLine from "@/components/SeparatorLine";
import handleCopyID from "@/scripts/handleCopyID";
import { useAppSelector } from "@/lib/store/hooks";
import { selectAllContacts } from "@/lib/store/slices/contacts";
import ThemedText from "@/components/ThemedText";
import ContactItem from "@/components/contact/ContactItem";
import { ContactType } from "@/scripts/database/handlers/add-contact-db";
import useModal from "@/hooks/use-modal";

export default function Contacts() {
  const { t } = useTranslation();
  const { setShowContactModal } = useModal();

  const contactItems = useAppSelector(selectAllContacts);

  const renderContactItem = ({ item }: { item: ContactType }) => (
    <ContactItem id={item.id} name={item.name} />
  );

  return (
    <View style={styles.container}>
      <ActionButtonBox
        buttons={[
          {
            title: t("actions.add-user"),
            source: require("@/assets/images/add-user.png"),
            handle: () => setShowContactModal(true),
          },
          {
            title: t("actions.copy"),
            source: require("@/assets/images/copy.png"),
            handle: handleCopyID,
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
