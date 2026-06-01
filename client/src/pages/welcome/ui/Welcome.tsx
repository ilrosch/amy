import { useRouter } from 'expo-router';
import { Trans, useTranslation } from 'react-i18next';

import { SafeView } from '@/shared/ui/views/SafeView';
import { ContainerScroll } from '@/shared/ui/views/ContainerScroll';
import { AnimView } from '@/shared/ui/views/AnimView';
import { Btn } from '@/shared/ui/buttons/Btn';
import { Txt } from '@/shared/ui/texts/Txt';
import { useExitApp } from '@/shared/lib/hooks/useExitApp';
import { Lnk } from '@/shared/ui/texts/Lnk';
import OwlLookStraight from '@/assets/icons/owl-look-straight-welcome';
import { styles } from './Welcome.style';

export default function Welcome() {
  const { t } = useTranslation('welcome');
  const router = useRouter();
  const handleExitApp = useExitApp();

  return (
    <SafeView>
      <ContainerScroll contentContainerStyle={styles.container}>
        <AnimView variant="fadeIn" conf={{ duration: 600 }} style={styles.boxImage}>
          <AnimView variant="slideUp" conf={{ value: 300, delay: 800 }}>
            <OwlLookStraight />
          </AnimView>
        </AnimView>

        <AnimView variant="fadeUp" style={styles.boxText}>
          <Txt color="textHeader" size="xl" isBold>
            {t('title')}
          </Txt>
          <Txt>
            <Trans
              i18nKey={'welcome:text'}
              components={[
                <Txt key="link" isBold color="primary" style={styles.link} onPress={() => {}} />,
              ]}
            />
          </Txt>
        </AnimView>

        <AnimView variant="fadeUp" conf={{ delay: 600 }} style={styles.boxBtn}>
          <Btn
            text={t('btnAgree')}
            textProps={{ isBold: true }}
            onPress={() => router.push('/sign-up')}
          />
          <Lnk text={t('common:btnExit')} onPress={handleExitApp} />
        </AnimView>
      </ContainerScroll>
    </SafeView>
  );
}
