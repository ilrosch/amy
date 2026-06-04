import AddIcon from '@/assets/icons/add';
import { ROUTES } from '@/shared/config/routes';
import { COLORS } from '@/shared/config/theme';
import { BtnIconFixed } from '@/shared/ui/buttons/BtnIconFixed';
import { Container } from '@/shared/ui/views/Container';
import { Section } from '@/shared/ui/views/Section';
import { ContactList } from '@/widgets/ContactList';
import { useRouter } from 'expo-router';

export default function Contacts() {
  const router = useRouter();

  return (
    <Section>
      <Container>
        <ContactList onPress={(id: string) => router.push(ROUTES.PROFILE(id))} />
        <BtnIconFixed onPress={() => router.push(ROUTES.ADD_CONTACT)}>
          <AddIcon color={COLORS.textContrast} />
        </BtnIconFixed>
      </Container>
    </Section>
  );
}
