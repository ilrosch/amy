import AddIcon from '@/assets/icons/add';
import { ROUTES } from '@/shared/config/routes';

import { COLORS } from '@/shared/config/theme';

import { BtnIconFixed } from '@/shared/ui/buttons/BtnIconFixed';

import { Container } from '@/shared/ui/views/Container';

import { Section } from '@/shared/ui/views/Section';
import { ChatList } from '@/widgets/ChatList';
import { useRouter } from 'expo-router';

export default function Chats() {
  const router = useRouter();

  return (
    <Section>
      <Container>
        <ChatList />
        <BtnIconFixed onPress={() => router.push(ROUTES.ADD_CHAT)}>
          <AddIcon color={COLORS.textContrast} />
        </BtnIconFixed>
      </Container>
    </Section>
  );
}
