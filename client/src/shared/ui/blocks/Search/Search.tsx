import { View } from 'react-native';
import { Input } from '../../texts/Input';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type SearchType = {
  onChange: (text: string) => void;
};

export function Search({ onChange }: SearchType) {
  const { t } = useTranslation('common');
  const [searchBy, setSearchBy] = useState<string>('');

  useEffect(() => {
    const timerID = setTimeout(() => {
      onChange(searchBy);
    }, 500);

    return () => {
      clearTimeout(timerID);
    };
  }, [onChange, searchBy]);

  return (
    <View>
      <Input value={searchBy} onChangeText={setSearchBy} placeholder={t('search')} />
    </View>
  );
}
