import ModalCustom from './ModalCustom';
import Form, { FormDataType } from '../shared/Form';
import { useTranslation } from 'react-i18next';

export type FormModalType = {
  title: string;
  text: string;
  btnText: string;
  placeholder: string;
  valueField?: string;
  handler: (value: string, userID?: string) => void;
  open: boolean;
  close: () => void;
  userID?: string;
};

export default function FormModal({
  title,
  text,
  btnText,
  placeholder,
  valueField = '',
  handler,
  open,
  close,
  userID,
}: FormModalType) {
  const { t } = useTranslation();

  const handleSubmit = async ({ value, setError }: FormDataType) => {
    setError('');
    try {
      await handler(value, userID);
      close();
    } catch (err) {
      setError(t(err));
    }
  };

  return (
    <ModalCustom title={t(title)} text={t(text)} line={true} visible={open} close={close}>
      <Form buttonText={t(btnText)} placeholder={t(placeholder)} valueField={valueField} handler={handleSubmit} />
    </ModalCustom>
  );
}
