import { View } from 'react-native';
import BtnRounded from '../shared/buttons/BtnRounded';
import { acceptContact } from '@/src/scripts/app/handlers/contact/accept';
import { rejectContact } from '@/src/scripts/app/handlers/contact/reject';
import { appStyles } from '@/src/assets/tokens';

export default function InviteActions({ id }: { id: string }) {
  return (
    <View style={[appStyles.box, appStyles.shadow]}>
      
      <BtnRounded name="Принять" size="s" onPress={() => acceptContact(id)} />
      <BtnRounded name="Отклонить" size="s" type="outDanger" onPress={() => rejectContact(id)} />
    </View>
  );
}
