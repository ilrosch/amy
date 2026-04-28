import { useRouter } from 'expo-router';

import { Colors } from '@/src/assets/tokens';
import BackIcon from '@/src/assets/icons/back-icon';
import BtnIconFixed from '../shared/BtnIconFixed';

export default function Back() {
  const router = useRouter();

  return (
    <BtnIconFixed handle={router.back}>
      <BackIcon color={Colors.white} />
    </BtnIconFixed>
  );
}
