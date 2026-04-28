import { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';

import { useAppSelector } from '@/src/lib/store/hooks';
import { selectAllChats } from '@/src/lib/store/slices/chats';

import { ChatType } from '@/src/assets/entities/chat';
import { Colors } from '@/src/assets/tokens';
import PlusIcon from '@/src/assets/icons/plus-icon';

import Container from '@/src/components/shared/Container';
import ContainerScroll from '@/src/components/shared/ContainerScroll';
import ChatsList from '@/src/components/widgets/chats/ChatsList';
import BtnIconFixed from '@/src/components/shared/BtnIconFixed';
import SearchForm from '@/src/components/widgets/SearchForm';
// import Notify from '@/src/components/widgets/notify';

export default function Chats() {
  const router = useRouter();
  const chats = useAppSelector(selectAllChats);
  const [currentChats, setCurrentChats] = useState<ChatType[]>(chats);

  useEffect(() => {
    setCurrentChats(chats);
  }, [chats]);

  const handleSearch = (value: string) => {
    setCurrentChats(chats.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <Container>
      <ContainerScroll>
        {chats.length > 3 && <SearchForm handleSearch={handleSearch} />}
        <ChatsList items={currentChats} />
      </ContainerScroll>
      {/* <Notify /> */}
      <BtnIconFixed handle={() => router.push('new-chat')}>
        <PlusIcon color={Colors.white} size={20} />
      </BtnIconFixed>
    </Container>
  );
}
