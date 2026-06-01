import { useBack } from '@/shared/lib/hooks/useBack';
import { Btn } from '@/shared/ui/buttons/Btn';
import { Input } from '@/shared/ui/texts/Input';
import { Lnk } from '@/shared/ui/texts/Lnk';
import { Txt } from '@/shared/ui/texts/Txt';
import { AnimView } from '@/shared/ui/views/AnimView';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './CreateAccount.style';
import { useValidateName } from '@/entities/User';
import { useRouter } from 'expo-router';
import { useCreateUserAccount } from '../model/create';

export default function CreateAccount() {
  const { t } = useTranslation('signUp');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleBack = useBack();
  const [userName, setUserName] = useState<string>('');

  const { handleCreateAccount } = useCreateUserAccount();

  const { validate } = useValidateName();

  const handleCreate = useCallback(async () => {
    const trimmed = userName.trim();
    if (!validate(trimmed)) return;
    setIsLoading(true);
    try {
      await handleCreateAccount(trimmed);
      router.replace('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [handleCreateAccount, router, userName, validate]);

  return (
    <>
      <AnimView variant="fadeUp" style={styles.boxText}>
        <Txt color="textHeader" size="xl" isBold>
          {t('title')}
        </Txt>
        <Txt style={{ marginBottom: 16 }}>{t('text')}</Txt>
        <Input
          value={userName}
          onChangeText={setUserName}
          placeholder={t('placeholder')}
          isEditable={!isLoading}
        />
        <Txt style={{ marginTop: 12 }}>{t('tip')}</Txt>
      </AnimView>
      <AnimView variant="fadeUp" conf={{ delay: 600 }} style={styles.boxBtn}>
        <Btn
          text={t('btnCreate')}
          textProps={{ isBold: true }}
          onPress={handleCreate}
          isLoading={isLoading}
        />
        <Lnk text={t('common:btnBack')} onPress={handleBack} />
      </AnimView>
    </>
  );
}
