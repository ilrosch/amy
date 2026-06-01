import CheckIcon from '@/assets/icons/check';
import { MessageStatus } from '../config/types';
import { COLORS } from '@/shared/config/theme';
import CheckDoubleIcon from '@/assets/icons/check-double';
import ClockIcon from '@/assets/icons/clock';

export interface IStatusIcon {
  status: MessageStatus;
}

export function StatusIcon({ status }: IStatusIcon) {
  switch (status) {
    case 'pending':
      return <ClockIcon color={COLORS.textSecondary} />;
    case 'sent':
      return <CheckIcon color={COLORS.textSecondary} />;
    case 'delivered':
      return <CheckDoubleIcon color={COLORS.textSecondary} />;
    case 'read':
      return <CheckDoubleIcon color={COLORS.primary} />;
  }
}
