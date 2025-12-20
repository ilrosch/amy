import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedText from '../../shared/ThemedText';
import { Colors } from '@/assets/tokens';
import Avatar from '../../shared/Avatar';

export interface CallPlaceholderType {
  name: string;
  status: string;
  isCamera: boolean;
}

export default function CallPlaceholder({ name, status, isCamera }: CallPlaceholderType) {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          flex: 1,
          alignItems: 'center',
          marginBottom: -30,
          paddingTop: top + 32,
          backgroundColor: Colors.light,
        },
        isCamera && { display: 'none' },
      ]}
    >
      <ThemedText style={{ color: Colors.textDark, marginBottom: 24 }}>{t('info.outgoing-call')}</ThemedText>
      <Avatar name={name} sizeText={'l'} styleBox={{ width: 100, height: 100, marginBottom: 12 }} />
      <ThemedText title size={'l'} style={{ color: Colors.titleDark }}>
        {name}
      </ThemedText>
      <ThemedText>{status}</ThemedText>
    </View>
  );
}
