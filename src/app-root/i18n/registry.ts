import { callResources } from '@/entities/call';
import { userResources } from '@/entities/user';
import { addContactFeatherResources } from '@/features/add-contact';
import { chatManageFeatherResources } from '@/features/manage-chat/config/i18n/resources';
import { manageContactInviteFeatherResources } from '@/features/manage-contact-invite';
import { manageContactFeatherResources } from '@/features/manage-contact/config';
import { userManageFeatherResources } from '@/features/manage-user';
import { renameContactFeatherResources } from '@/features/rename-contact';
import { renameUserFeatherResources } from '@/features/rename-user';
import { sendMessageFeatherResources } from '@/features/send-message';
import { addChatModalResources } from '@/pages/add-chat';
import { addContactModalResources } from '@/pages/add-contact';
import { renameContactResources } from '@/pages/rename-contact';
import { signUpResources } from '@/pages/sign-up';
import { welcomeResources } from '@/pages/welcome';

export const featuresResources = [
  { ns: 'welcome', resources: welcomeResources },
  { ns: 'signUp', resources: signUpResources },
  { ns: 'user', resources: userResources },
  { ns: 'addContactModal', resources: addContactModalResources },
  { ns: 'addContactFeather', resources: addContactFeatherResources },
  { ns: 'addChatModal', resources: addChatModalResources },
  { ns: 'manageContactInvite', resources: manageContactInviteFeatherResources },
  { ns: 'manageContact', resources: manageContactFeatherResources },
  { ns: 'renameContact', resources: renameContactResources },
  { ns: 'renameContactFeather', resources: renameContactFeatherResources },
  { ns: 'sendMessageFeather', resources: sendMessageFeatherResources },
  { ns: 'call', resources: callResources },
  { ns: 'chatManage', resources: chatManageFeatherResources },
  { ns: 'userManage', resources: userManageFeatherResources },
  { ns: 'renameUser', resources: renameUserFeatherResources },
] as const;
