import { UserActions } from '@/features/manage-user';
import { Container } from '@/shared/ui/views/Container';
import { Section } from '@/shared/ui/views/Section';

export default function Settings() {
  return (
    <Section>
      <Container>
        <UserActions />
      </Container>
    </Section>
  );
}
