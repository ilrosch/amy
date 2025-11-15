import { useState } from "react";
import { useTranslation } from "react-i18next";

import SafeView from "@/components/SafeView";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { useAppDispatch } from "@/store/hooks";
import { addAuth } from "@/store/slices/auth";

import * as SecureStore from "expo-secure-store";

const isValidName = (name: string) => name.length >= 2;

const saveUserData = async ({
  id,
  token,
  name,
}: {
  id: string;
  token: string;
  name: string;
}) => {
  const psID = SecureStore.setItem("id", id);
  const psToken = SecureStore.setItem("token", token);
  const psName = SecureStore.setItem("name", name);
  return Promise.all([psID, psToken, psName]);
};

export default function SingIn() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const normalizeName = name.trim();

    if (!isValidName(normalizeName)) {
      setError(t("errors.short"));
      return;
    }

    console.log("ok");

    try {
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/create_account`,
        { name: normalizeName },
      );
      const userData = { name: normalizeName, ...data };
      dispatch(addAuth(userData));
      await saveUserData(userData);
      router.replace("/chats");
    } catch (err) {
      switch (err.code) {
        case "ERR_NETWORK":
          setError(t("errors.server"));
          break;
        default:
          setError(t("errors.unknown"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeView>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.image}
          alt="Logo AMY"
        />
        <Text style={styles.title}>{t("welcome.title")}</Text>
        <Text style={styles.text}>{t("welcome.text")}</Text>
        <View style={styles.separator} />
        <View style={styles.form}>
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              placeholder={t("welcome.label")}
              value={name}
            />
            {error && <Text style={styles.error}>{error}</Text>}
          </View>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{t("welcome.button")}</Text>
          </Pressable>
        </View>
        <View style={styles.rule}>
          <Text style={styles.ruleText}>{t("welcome.rule")}</Text>
          <Text style={styles.ruleLink} onPress={() => router.push("/rules")}>
            {t("welcome.link")}
          </Text>
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  image: { alignSelf: "center", marginTop: 32 },
  title: {
    fontSize: 32,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 40,
    textAlign: "center",
    color: "#151515",
    marginTop: 60,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#151515CC",
    marginTop: 24,
  },
  separator: {
    width: 80,
    height: 2,
    backgroundColor: "rgba(134, 167, 136, 1.0)",
    alignSelf: "center",
    marginTop: 24,
  },
  form: { marginTop: 32 },
  field: {},
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
  rule: {
    marginTop: 16,
  },
  ruleText: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0.15,
    color: "#A2A2A2",
    textAlign: "center",
  },
  ruleLink: {
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0.15,
    color: "#A2A2A2",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
