import { useState } from 'react';
import ModalCustom from './ModalCustom';
import Btn from '../shared/Btn';

export type ConfirmModalType = {
  title: string;
  text: string;
  btnText: string;
  open: boolean;
  close: () => void;
  handler: () => void;
};

export default function ConfirmModal({ title, text, btnText, handler }: ConfirmModalType) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    await handler();
    setLoading(false);
  };

  return (
    <ModalCustom title={title} text={text}>
      <Btn btnText={btnText} color={'danger'} handler={handleSubmit} loadStatus={loading} />
    </ModalCustom>
  );
}
