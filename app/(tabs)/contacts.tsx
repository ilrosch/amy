import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { useAppSelector } from '@/src/lib/store/hooks';
import { selectAllContacts } from '@/src/lib/store/slices/contacts';

import { ContactType } from '@/src/assets/entities/contact';
import { Colors } from '@/src/assets/tokens';
import PlusIcon from '@/src/assets/icons/plus-icon';

import Container from '@/src/components/shared/Container';
import ContainerScroll from '@/src/components/shared/ContainerScroll';
import ContactList from '@/src/components/widgets/contacts/ContactList';
import BtnIconFixed from '@/src/components/shared/BtnIconFixed';
import SearchForm from '@/src/components/widgets/SearchForm';

export default function Contacts() {
  const router = useRouter();
  const contacts = useAppSelector(selectAllContacts).sort((a, b) => a.name.localeCompare(b.name));
  const [currentContacts, setCurrentContacts] = useState<ContactType[]>(contacts);

  useEffect(() => {
    setCurrentContacts(contacts);
  }, [contacts]);

  const handleSearch = (value: string) => {
    setCurrentContacts(
      contacts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())),
    );
  };

  return (
    <Container>
      <ContainerScroll>
        {contacts.length > 3 && <SearchForm handleSearch={handleSearch} />}
        <ContactList items={currentContacts} />
      </ContainerScroll>
      <BtnIconFixed handle={() => router.push('add-contact')}>
        <PlusIcon color={Colors.white} size={20} />
      </BtnIconFixed>
    </Container>
  );
}
