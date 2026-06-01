import { COLORS } from '@/shared/config/theme';
import { Avatar } from '@/shared/ui/blocks/Avatar/Avatar';
import { Txt } from '@/shared/ui/texts/Txt';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chat } from '../model/types';
import { useTranslation } from 'react-i18next';
import { formatTime } from '@/shared/lib/date';
import { Box } from '@/shared/ui/views/Box/Box';

export type IChatItem = {
  chat: Chat;
  onPress: (chatID: string) => void;
};

export function ChatItem({ chat, onPress }: IChatItem) {
  const { t } = useTranslation('common');

  const isNew = chat.lastMessage?.status === 'new';

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(chat.id)}>
      <Box style={[styles.box, isNew && styles.new]}>
        <Avatar text={chat.contactName} />
        <View style={styles.content}>
          <Txt
            color="textHeader"
            numberOfLines={1}
            ellipsizeMode="tail"
            isBold
            style={styles.textLeft}
          >
            {chat.contactName}
          </Txt>
          <Txt size="s" numberOfLines={1} ellipsizeMode="tail" style={styles.textLeft}>
            {chat.lastMessage?.content || t('empty')}
          </Txt>
        </View>
        <View>
          <Txt size="xs">{chat.lastMessage?.at && formatTime(chat.lastMessage?.at)}</Txt>
        </View>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 30,
    overflow: 'hidden',
  },

  new: {
    backgroundColor: COLORS.bgSecondary,
  },

  content: {
    flexShrink: 1,
    width: '100%',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: COLORS.borderSecondary,
    paddingBottom: 6,
  },

  textLeft: {
    textAlign: 'left',
  },

  boxInfo: {
    height: '100%',
  },
});
