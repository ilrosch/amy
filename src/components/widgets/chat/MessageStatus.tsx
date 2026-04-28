import { StatusMessage } from '@/src/assets/entities/message';
import CheckDoubleIcon from '@/src/assets/icons/check-double-icon';
import CheckIcon from '@/src/assets/icons/check-icon';
import ClockIcon from '@/src/assets/icons/clock-icon';
import { Colors } from '@/src/assets/tokens';

export default function MessageStatus({ status }: { status: StatusMessage }) {
  switch (status) {
    case 'pending':
      return <ClockIcon size={14} color={Colors.textDark} />;
    case 'sent':
      return <CheckIcon size={14} color={Colors.textDark} />;
    case 'delivered':
      return <CheckDoubleIcon size={14} color={Colors.textDark} />;
    case 'read':
      return <CheckDoubleIcon size={14} color={Colors.danger} />;
  }
}
