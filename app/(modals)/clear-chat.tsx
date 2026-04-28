// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Alert } from 'react-native';
// import { useTranslation } from 'react-i18next';

// import ConfirmModal from '@/src/components/modal/ConfirmModal';
// // import { handleClearChat } from '@/src/scripts/handlers/clear-chat';
// import { showToast } from '@/src/scripts/toast';
// import { clearChat } from '@/src/scripts/app/handlers/chat/clear';

// export default function AddContactModal() {
//   const { t } = useTranslation();
//   const { id: userID } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();

//   const handleSubmit = async () => {
//     try {
//       await clearChat(userID);
//       showToast({ type: 'success', text1: t('toast.clear-chat') });
//       router.back();
//     } catch (err) {
//       let message;
//       switch (err) {
//         case 'ERR_VALID_NAME':
//           message = 'errors.invalid-name';
//           break;
//         case 'ERR_NETWORK':
//           message = 'errors.server';
//           break;
//         default:
//           message = 'errors.unknown';
//       }

//       Alert.alert(t('errors.error'), t(message));
//     }
//   };

//   return (
//     <ConfirmModal
//       title={t('modal.clear-chat')}
//       text={t('modal.clear-chat-text')}
//       btnText={t('modal.clear-chat-btn')}
//       handler={handleSubmit}
//     />
//   );
// }
