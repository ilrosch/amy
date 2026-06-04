import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/blocks/Avatar';
import { Txt } from '@/shared/ui/texts/Txt';

export interface ICallPlaceholder {
  contactName: string;
  duration: string;
  status: string;
  isCameraEnabled: boolean;
  isOutgoing: boolean;
}

export function CallPlaceholder({
  contactName,
  duration,
  status,
  isCameraEnabled,
  isOutgoing,
}: ICallPlaceholder) {
  const { t } = useTranslation('call');

  if (isCameraEnabled) return;

  return (
    <View style={styles.container}>
      <Txt>{t(isOutgoing ? 'outgoing-direction' : 'incoming-direction')}</Txt>
      <Avatar text={contactName} textProps={{ size: 'l' }} style={styles.avatar} />
      <Txt color="textHeader" size="l" isBold>
        {contactName}
      </Txt>
      <Txt isBold style={styles.space}>
        {status}
      </Txt>
      <Txt color="textHeader" isBold>
        {duration}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  avatar: {
    width: 100,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  space: {
    marginTop: 6,
    marginBottom: 6,
  },
});
