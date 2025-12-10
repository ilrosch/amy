import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

// import { useAppDispatch } from '@/lib/store/hooks';
import handleCopy from '@/scripts/handleCopyID';
import { Colors } from '@/assets/tokens';

import CopyIcon from '@/assets/icons/copy-icon';

import BtnActionIconBox from '@/components/action/BtnActionIconBox';
import BtnActionTextBox from '@/components/action/BtnActionTextBox';

export default function Settings() {
  const { t } = useTranslation();
  // const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <BtnActionIconBox
        btnData={[
          {
            Icon: CopyIcon,
            title: t('actions.copy'),
            handle: handleCopy,
          },
        ]}
      />
      <BtnActionTextBox
        btnData={[
          {
            title: t('actions.rename'),
          },
          {
            title: t('actions.clear-chat'),
            styleText: styles.btnDander,
          },
          {
            title: t('actions.delete-contact'),
            styleText: styles.btnDander,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1,
    gap: 6,
  },
  btnDander: {
    color: Colors.danger,
  },
});
