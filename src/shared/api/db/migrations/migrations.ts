import { migration_001_contacts } from './001_contacts';
import { migration_002_chats } from './002_chats';
import { migration_003_messages } from './003_messages';

export const migrations: string[] = [
  migration_001_contacts,
  migration_002_chats,
  migration_003_messages,
];
