import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { appStyles } from '@/src/assets/tokens';
import { ChatType } from '@/src/assets/entities/chat';

import InfoBadge from '../../shared/InfoBadge';
import ChatItem from './ChatItem';

export default function ChatsList({ items }: { items: ChatType[] }) {
  const { t } = useTranslation();

  if (items.length === 0) {
    return <InfoBadge name={t('info.noChats')} />;
  }

  return (
    <View style={[styles.box, appStyles.boxS, appStyles.shadow]}>
      {items.map((item) => (
        <ChatItem key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    gap: 6,
    marginBottom: 40,
    overflow: 'hidden',
  },
});
