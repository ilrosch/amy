import { Avatar } from '@/shared/ui/blocks/Avatar/Avatar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Contact } from '../model';
import { Txt } from '@/shared/ui/texts/Txt';
import { COLORS } from '@/shared/config/theme';

export type ContactCardType = {
  contact: Contact;
  param?: 'id' | 'chatID';
  onPress?: (id: string) => void;
};

export function ContactCard({ contact, param = 'id', onPress }: ContactCardType) {
  return (
    <TouchableOpacity onPress={() => onPress(contact[param])} activeOpacity={0.7}>
      <View style={styles.card}>
        <Avatar text={contact.name} />
        <View style={styles.content}>
          <Txt isBold numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            {contact.name}
          </Txt>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 6,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.borderSecondary,
  },
  text: {
    textAlign: 'left',
  },
});
