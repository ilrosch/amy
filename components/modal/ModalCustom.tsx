import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import SeparatorLine from "../SeparatorLine";
import { ReactNode, useEffect, useRef, useState } from "react";
import ThemedText from "../ThemedText";

export type ModalCustomType = {
  title: string;
  text: string;
  line?: boolean;
  handleClose: () => void;
  visible?: boolean;
  children?: ReactNode;
};

export default function ModalCustom({
  title,
  text,
  handleClose,
  children,
  line = false,
  visible = true,
}: ModalCustomType) {
  const [hiddenOverlay, setHiddenOverlay] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(1000)).current;

  const fadeIn = () => {
    setHiddenOverlay(false);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setHiddenOverlay(true);
    });
  };

  useEffect(() => {
    if (visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        },
        hiddenOverlay && { display: "none" },
      ]}
    >
      <Modal animationType="none" transparent={true} visible={visible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modal}
        >
          <Animated.View
            style={[{ transform: [{ translateY: translateYAnim }] }]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.close,
                pressed && styles.closePress,
              ]}
              onPress={() => {
                fadeOut();
                handleClose();
              }}
            >
              <Image
                source={require("@/assets/images/close.png")}
                alt="close"
              />
            </Pressable>
            <View style={styles.modalBody}>
              <ThemedText title={true} size={"l"} style={styles.title}>
                {title}
              </ThemedText>
              <ThemedText size={"m"} style={styles.text}>
                {text}
              </ThemedText>
              {line && <SeparatorLine style={styles.line} />}
              {children}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000099",
    zIndex: 9,
  },

  modal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40,
    padding: 12,
  },

  close: {
    width: 68,
    height: 68,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: -17,
    zIndex: 1,
  },
  closePress: {
    opacity: 0.95,
  },
  modalBody: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingVertical: 32,
    paddingHorizontal: 28,
    gap: 14,
  },
  title: {
    color: "#151515",
  },
  text: {
    color: "#151515CC",
  },
  line: {
    width: 80,
    backgroundColor: "rgba(134, 167, 136, 1.0)",
  },
});
