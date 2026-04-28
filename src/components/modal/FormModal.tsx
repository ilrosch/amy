import ModalCustom from './ModalCustom';
import Form, { FormDataType } from '../shared/Form';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

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
  userID,
}: FormModalType) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = async ({ value }: FormDataType) => {
    try {
      await handler(value, userID);
      router.back();
    } catch (err) {
      Alert.alert(t('errors.error'), err.code);
    }
  };

  return (
    <ModalCustom title={title} text={text}>
      <Form
        buttonText={btnText}
        placeholder={placeholder}
        valueField={valueField}
        handler={handleSubmit}
      />
    </ModalCustom>
  );
}
