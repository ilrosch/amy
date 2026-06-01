import { StyleSheet, View } from 'react-native';
import { formatTime } from '@/shared/lib/date';
import { COLORS } from '@/shared/config/theme';
import { Txt } from '@/shared/ui/texts/Txt';
import { Message } from '../config/types';
import { StatusIcon } from './StatusIcon';

interface MessageItemProps {
  message: Message;
  userID: string;
}

export function MessageItem({ message, userID }: MessageItemProps) {
  const isMine = message.userFrom === userID;

  return (
    <View style={[styles.box, isMine ? styles.itemFromUser : styles.itemFromContact]}>
      <Txt style={styles.textLeft}>{message.content}</Txt>
      <View style={styles.info}>
        <Txt color="textSecondary" size="s">
          {formatTime(message.createdAt)}
        </Txt>
        {isMine && <StatusIcon status={message.status} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexShrink: 1,
    minWidth: 80,
    maxWidth: '80%',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },

  textLeft: {
    textAlign: 'left',
  },

  itemFromUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#86A78833',
    borderBottomRightRadius: 4,
  },

  itemFromContact: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.bgSecondary,
    borderBottomLeftRadius: 4,
  },

  info: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 8,
  },
});
