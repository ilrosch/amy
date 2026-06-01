import AddIcon from '@/assets/icons/add';
import { ROUTES } from '@/shared/config/routes';
import { COLORS } from '@/shared/config/theme';
import { Search } from '@/shared/ui/blocks/Search';
import { BtnIconFixed } from '@/shared/ui/buttons/BtnIconFixed';
import { Txt } from '@/shared/ui/texts/Txt';
import { Container } from '@/shared/ui/views/Container';
import { ContainerScroll } from '@/shared/ui/views/ContainerScroll';
import { Section } from '@/shared/ui/views/Section';
import { ContactList } from '@/widgets/ContactList';
import { router, useRouter } from 'expo-router';

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
