// import { Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useTranslation } from 'react-i18next';

// import { useAppSelector } from '@/src/lib/store/hooks';
// import { selectUserName } from '@/src/lib/store/slices/auth';
// import { showToast } from '@/src/scripts/toast';
// // import { renameUser } from '@/src/scripts/handlers/user/rename';

// import ModalCustom from '@/src/components/modal/ModalCustom';
// import Form from '@/src/components/shared/Form';

// export default function RenameUserModal() {
//   const { t } = useTranslation();
//   const router = useRouter();
//   const userName = useAppSelector(selectUserName);

//   const handleSubmit = async ({ value }: { value: string }) => {
//     try {
//       // await renameUser(value);
//       showToast({ type: 'success', text1: t('toast.rename-user') });
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
//     <ModalCustom title={t('modal.rename-user')} text={t('modal.rename-user-text')}>
//       <Form
//         buttonText={t('actions.save')}
//         placeholder={t('modal.rename-user-label')}
//         valueField={userName}
//         handler={handleSubmit}
//       />
//     </ModalCustom>
//   );
// }
