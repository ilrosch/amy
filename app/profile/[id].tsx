import ActionButtonBox from "@/components/ActionButtonBox";
import Avatar from "@/components/Avatar";
import BtnAction, { BtnActionType } from "@/components/BtnAction";
import ThemedText from "@/components/ThemedText";
import { useAppSelector } from "@/lib/store/hooks";
import { selectContact } from "@/lib/store/slices/contacts";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";

export default function Profile() {
  const { t } = useTranslation();
  const currentParams = useLocalSearchParams<{ id: string }>();
  const currentUser = useAppSelector((state) =>
    selectContact(state, currentParams.id)
  );

  const readerBtnAction = ({ item }: { item: BtnActionType }) => (
    <BtnAction {...item} />
  );

  return (
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
        <ActionButtonBox
          buttons={[
            {
              title: t("actions.add-chat"),
              source: require("@/assets/images/add-chat.png"),
            },
            {
              title: t("actions.call"),
              source: require("@/assets/images/call.png"),
            },
          ]}
        />
        <FlatList
          data={[
            { title: t("actions.rename") },
            { title: t("actions.clear-chat"), styleText: styles.btnDander },
            {
              title: t("actions.delete-contact"),
              styleText: styles.btnDander,
            },
          ]}
          renderItem={readerBtnAction}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ gap: 8, marginTop: 20 }}
        />
      </View>
    </View>
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
