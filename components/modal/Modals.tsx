import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import ConfirmModal from './ConfirmModal';
import FormModal from './FormModal';
import { closeModal } from '@/lib/store/slices/modals';
import ModalCustom from './ModalCustom';
import modalData from '@/lib/modalData';

const ModalComponents = {
  confirm: ConfirmModal,
  form: FormModal,
  base: ModalCustom,
} as const;

export default function Modals() {
  const { name, open, props } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();

  if (!name || !open) return null;

  const handleClose = () => dispatch(closeModal());

  const { type, ...modalProps } = modalData[name];

  const ModalComponent = ModalComponents[type];
  return <ModalComponent open close={handleClose} {...modalProps} {...props} />;
}
