import { Animated, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ThemedText from '../shared/ThemedText';
import { useRouter } from 'expo-router';
import SafeView from '../shared/SafeView';
import { Colors } from '@/assets/tokens';
import CloseIcon from '@/assets/icons/close-icon';

export type ModalCustomType = {
  title: string;
  text: string;
  children?: ReactNode;
};

export default function ModalCustom({ title, text, children }: ModalCustomType) {
  const router = useRouter();

  const [value, setValue] = useState<number>(0);
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    translateYAnim.setValue(value + 100);
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [value, translateYAnim]);

  const fadeOut = Animated.timing(translateYAnim, {
    toValue: value + 100,
    duration: 300,
    useNativeDriver: true,
  });

  const close = () => {
    fadeOut.start(() => {
      router.back();
    });
  };

  return (
    <SafeView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: 24 }}>
        <Animated.View
          style={[styles.modal, { transform: [{ translateY: translateYAnim }] }]}
          onLayout={(e) => setValue(e.nativeEvent.layout.height)}
        >
          <Pressable onPress={close} style={() => [styles.close]}>
            <CloseIcon color={Colors.danger} />
          </Pressable>
          <View style={styles.modalBody}>
            <ThemedText title={true} size={'l'} style={styles.title}>
              {title}
            </ThemedText>
            <ThemedText style={styles.text}>{text}</ThemedText>
            <ScrollView
              style={{ flexGrow: 0, flexShrink: 1 }}
              contentContainerStyle={{ paddingTop: 6 }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0000009d',
    justifyContent: 'flex-end',
    paddingHorizontal: 6,
  },

  modal: {
    maxHeight: '100%',
    alignItems: 'center',
  },

  modalBody: {
    flexGrow: 0,
    flexShrink: 1,
    maxWidth: 600,
    borderRadius: 24,
    backgroundColor: Colors.white,
    paddingTop: 42,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },

  modalContent: {
    marginTop: 16,
    backgroundColor: 'green',
  },

  title: {
    color: Colors.titleDark,
    marginBottom: 6,
  },

  text: {
    color: Colors.textDark,
    marginBottom: 6,
  },

  close: {
    width: 66,
    height: 66,
    borderRadius: 100,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -24,
    zIndex: 1,
  },
});
