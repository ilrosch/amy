import { Dispatch, SetStateAction, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import ThemedText from "./ThemedText";

export type FormDataType = {
  value: string;
  setError: Dispatch<SetStateAction<string>>;
};

export type FormType = {
  buttonText: string;
  placeholder: string;
  handler: (data: FormDataType) => void;
  style?: {
    input?: TextStyle | TextStyle[];
    button?: ViewStyle | ViewStyle[];
  };
};

export default function Form({
  buttonText,
  placeholder,
  handler,
  style = {},
}: FormType) {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    await handler({ value: value.trim(), setError });
    setLoading(false);
  };

  return (
    <View>
      <View>
        <TextInput
          style={[
            styles.input,
            style.input,
            error ? styles.inputInValid : styles.inputValid,
          ]}
          onChangeText={setValue}
          placeholder={placeholder}
          value={value}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <Pressable
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          style.button,
          pressed && styles.buttonPress,
        ]}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <ThemedText title={true} size={"m"} style={styles.buttonText}>
            {buttonText}
          </ThemedText>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",

    paddingVertical: 12,
    paddingHorizontal: 16,

    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    color: "#1E1E1E",
  },

  inputValid: {
    borderColor: "rgba(217, 217, 217, 1.0)",
  },

  inputInValid: {
    borderColor: "#E41D30",
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
    minHeight: 48,
  },

  buttonPress: {
    backgroundColor: "#608862ff",
  },

  buttonText: {
    color: "#FFFFFF",
  },
});
