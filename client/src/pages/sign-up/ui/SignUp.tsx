import { SafeView } from '@/shared/ui/views/SafeView';
import { ContainerScroll } from '@/shared/ui/views/ContainerScroll';
import { AnimView } from '@/shared/ui/views/AnimView';
import { CreateAccount } from '@/features/create-account';
import OwlLookAside from '@/assets/icons/owl-look-aside-sign-up';

import { styles } from './SignUp.style';

export default function SignUp() {
  return (
    <SafeView>
      <ContainerScroll contentContainerStyle={styles.container}>
        <AnimView variant="fadeIn" conf={{ duration: 600 }} style={styles.boxImage}>
          <AnimView variant="slideUp" conf={{ value: 300, delay: 800 }}>
            <OwlLookAside />
          </AnimView>
        </AnimView>
        <CreateAccount />
      </ContainerScroll>
    </SafeView>
  );
}
