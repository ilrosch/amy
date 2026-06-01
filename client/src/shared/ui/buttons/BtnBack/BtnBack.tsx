import { COLORS } from '@/shared/config/theme';
import BackIcon from '../../../../../src_old/assets/icons/back-icon';
import { BtnIconFixed, BtnIconFixedType } from '../BtnIconFixed';
import { useBack } from '@/shared/lib/hooks/useBack';

export function BtnBack({ ...props }: BtnIconFixedType) {
  const handleBack = useBack();

  return (
    <BtnIconFixed onPress={handleBack} style={{ bottom: 40 }} {...props}>
      <BackIcon color={COLORS.textContrast} />
    </BtnIconFixed>
  );
}
