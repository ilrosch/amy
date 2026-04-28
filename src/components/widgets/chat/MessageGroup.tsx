import { StyleSheet, View } from 'react-native';

import { Message } from '@/src/assets/entities/message';
import { Colors } from '@/src/assets/tokens';

import InfoBadge from '@/src/components/shared/InfoBadge';
import MessageItem from './MessageItem';

export default function MessageGroup({ date, messages }: { date: string; messages: Message[] }) {
  return (
    <View>
      <InfoBadge name={date} style={{ box: styles.badge }} />
      <View style={styles.items}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.white,
    shadowColor: Colors.shadowLight,
  },
  items: {
    marginTop: 12,
    gap: 8,
  },
});
