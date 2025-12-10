import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ThemedText from './shared/ThemedText';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { closeNotice as close, openNotice } from '@/lib/store/slices/notices';
import noticeData from '@/lib/noticeData';
// import { useEffect } from 'react';
import { store } from '@/lib/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function Notice() {
  const { name, open, props } = useAppSelector((state) => state.notices);
  // const dispatch = useAppDispatch();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  if (!name || !open) return null;

  const { text, ...noticeProps } = noticeData[name];

  // return <ModalComponent open close={handleClose} {...modalProps} {...props} />;

  return (
    <View style={[styles.box, { marginBottom: bottom + 65 }]}>
      <ActivityIndicator size="small" color="#eee" />
      <ThemedText style={styles.text}>{t(text)}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#ffffffff',
  },
  text: {
    color: '#151515',
  },
});

export const connServerNotice = () => {
  store.dispatch(openNotice({ name: 'connServer' }));
};

export const reConnServerNotice = () => {
  store.dispatch(openNotice({ name: 'reConnServer' }));
};

export const closeNotice = () => {
  store.dispatch(close());
};
