import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { useAppDispatch } from "@/lib/store/hooks";
import { addAuth } from "@/lib/store/slices/auth";
import handlerErrors from "@/scripts/utils/handlerErrors";
import createAccount from "@/scripts/handlers/createAccount";

import SafeView from "@/components/SafeView";
import Form, { FormDataType } from "@/components/Form";
import ThemedText from "@/components/ThemedText";
import SeparatorLine from "@/components/SeparatorLine";
import Loader from "@/components/Loader";

export default function SingIn() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async ({ value, setError }: FormDataType) => {
    setLoading(true);
    setError("");

    try {
      const authData = await createAccount(value);
      dispatch(addAuth(authData));
      router.replace("/chats");
    } catch (err) {
      console.log(err);
      const textErr = handlerErrors(err);
      setError(t(textErr));
    }

    setLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <SafeView>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.image}
            alt="Logo AMY"
          />
          <ThemedText title={true} size={"xl"} style={styles.title}>
            {t("welcome.title")}
          </ThemedText>
          <ThemedText style={styles.text}>{t("welcome.text")}</ThemedText>
          <SeparatorLine style={styles.separator} />
          <Form
            buttonText={t("welcome.button")}
            placeholder={t("welcome.label")}
            handler={handleSubmit}
          />
          <View style={styles.rule}>
            <ThemedText size={"m"} style={styles.ruleText}>
              {t("welcome.rule")}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push("/rules")}>
              <ThemedText size={"m"} style={styles.ruleLink}>
                {t("welcome.link")}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  image: { alignSelf: "center", marginTop: 32 },
  title: {
    color: "#151515",
    marginTop: 60,
  },
  text: {
    color: "#151515CC",
    marginTop: 24,
  },
  separator: {
    backgroundColor: "rgba(134, 167, 136, 1.0)",
    marginVertical: 24,
  },
  rule: {
    marginTop: 16,
  },
  ruleText: {
    color: "#A2A2A2",
  },
  ruleLink: {
    color: "#A2A2A2",
    textDecorationLine: "underline",
  },
});
