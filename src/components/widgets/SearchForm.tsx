import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appStyles, Colors } from '@/src/assets/tokens';
import CloseIcon from '@/src/assets/icons/close-icon';
import Input from '../shared/Input';

export default function SearchForm({ handleSearch }: { handleSearch: (value: string) => void }) {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');

  const onChange = (value: string) => {
    setValue(value);
    handleSearch(value);
  };

  return (
    <View style={[styles.box, appStyles.boxS, appStyles.shadow]}>
      <Input
        value={value}
        setValue={onChange}
        placeholder={t('actions.search')}
        style={{ input: styles.input }}
        returnKeyType="search"
      />
      {value && (
        <Pressable
          onPress={() => onChange('')}
          style={styles.btn}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <CloseIcon color={Colors.danger} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    right: 40,
  },
  input: {
    flexGrow: 1,
    borderRadius: 30,
    paddingRight: 52,
  },
});
