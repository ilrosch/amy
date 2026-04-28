import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Colors } from '@/src/assets/tokens';

import BtnGroup from '@/src/components/action/BtnGroup';
import Container from '@/src/components/shared/Container';
import ContainerScroll from '@/src/components/shared/ContainerScroll';
import ThemedText from '@/src/components/shared/ThemedText';
import { share } from '@/src/scripts/app/handlers/share';
import { useAppSelector } from '@/src/lib/store/hooks';
import { selectUserID } from '@/src/lib/store/slices/user';
import { deleteUser } from '@/src/scripts/app/handlers/user/delete';

export default function Settings() {
  const { t } = useTranslation();
  const router = useRouter();

  const userID = useAppSelector(selectUserID);

  return (
    <Container>
      <ContainerScroll>
        <BtnGroup
          name={t('settings.user')}
          btns={[
            {
              title: t('actions.copy'),
              handle: () => {
                share({
                  title: t('actions.share-id-title'),
                  message: `${t('actions.share-id-text')} ${userID}`,
                });
              },
            },
            {
              title: t('actions.rename'),
              handle: () => router.push('/rename-user'),
            },
            {
              type: 'danger',
              title: t('actions.delete-account'),
              handle: () => deleteUser(),
            },
          ]}
        />

        <BtnGroup
          name={t('settings.chats')}
          btns={[
            {
              type: 'danger',
              title: t('actions.clear-chat'),
            },
          ]}
        />

        <BtnGroup
          name={t('settings.contacts')}
          btns={[
            {
              title: t('actions.add-contact'),
              handle: () => router.push('/add-contact'),
            },
            {
              type: 'danger',
              title: t('actions.delete-contacts'),
            },
          ]}
        />

        <BtnGroup
          name={t('settings.app')}
          btns={[
            {
              title: t('actions.rules'),
              handle: () => router.push('/rules'),
            },
            {
              title: t('actions.feedback'),
              handle: () => {},
            },
          ]}
        />

        <ThemedText size="s" style={{ color: Colors.textDark, marginTop: 12 }}>
          {`${t('info.app-version')}: v${process.env.EXPO_PUBLIC_APP_VERSION}`}
        </ThemedText>
      </ContainerScroll>
    </Container>
  );
}
