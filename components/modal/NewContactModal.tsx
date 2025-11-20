import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import ModalCustom from "../Modal";
import Form, { FormDataType } from "../Form";
import addContactHandler from "@/scripts/handlers/add-contact";

export type NewContactModalType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function NewContactModal({
  visible,
  setVisible,
}: NewContactModalType) {
  const { t } = useTranslation();

  const handleSubmit = async ({ value, setError }: FormDataType) => {
    setError("");
    try {
      await addContactHandler(value);
      setVisible(false);
    } catch (err) {
      setError(t(err));
    }
  };

  return (
    <ModalCustom
      title={t("modal.add-contact")}
      text={t("modal.add-contact-text")}
      line={true}
      visible={visible}
      handleClose={() => setVisible(false)}
    >
      <Form
        buttonText={t("modal.add-contact-btn")}
        placeholder={t("modal.add-contact-label")}
        handler={handleSubmit}
      />
    </ModalCustom>
  );
}
