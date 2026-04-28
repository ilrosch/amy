import { Message } from '@/src/assets/entities/message';
import ThemedText from '@/src/components/shared/ThemedText';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectUserID } from '@/src/lib/store/slices/user';
import { StyleSheet, View } from 'react-native';
import MessageStatus from './MessageStatus';
import { Colors } from '@/src/assets/tokens';

export default function MessageItem({ message }: { message: Message }) {
  const currentID = useAppSelector(selectUserID);
  const iSender = currentID === message.user_from;

  const date = new Date(message.created_at);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return (
    <View style={[styles.item, iSender ? styles.itemFrom : styles.itemTo]}>
      <ThemedText style={{ textAlign: 'left', color: Colors.titleDark }}>
        {message.content}
      </ThemedText>
      <View style={styles.info}>
        <ThemedText
          size={'xs'}
          style={{ color: Colors.textDark }}
        >{`${hours}:${minutes}`}</ThemedText>
        {iSender && <MessageStatus status={message.status} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexShrink: 1,
    minWidth: 100,
    maxWidth: 300,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemFrom: {
    alignSelf: 'flex-end',
    backgroundColor: '#86A78833',
  },
  itemTo: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light,
  },
  info: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
});
