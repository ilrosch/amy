import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import SeparatorLine from "./SeparatorLine";
import { ReactNode } from "react";

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
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable
            style={({ pressed }) => [
              styles.close,
              pressed && styles.closePress,
            ]}
            onPress={handleClose}
          >
            <Image source={require("@/assets/images/close.png")} alt="close" />
          </Pressable>
          <View style={styles.modalBody}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
            {line && <SeparatorLine style={styles.line} />}
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    padding: 20,
  },
  modal: {
    marginTop: 30,
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
    opacity: 0.9,
  },
  modalBody: {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 28,
    color: "#151515",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#151515CC",
  },
  line: {
    width: 80,
    backgroundColor: "rgba(134, 167, 136, 1.0)",
  },
});
