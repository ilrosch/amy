import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import ModalCustom from "../Modal";
import Form, { FormDataType } from "../Form";
import renameContactHandler from "@/scripts/handlers/rename-contact";

export type RenameContactModalType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  currentID: string;
  currentName: string;
};

export default function RenameContactModal({
  visible,
  setVisible,
  currentID,
  currentName,
}: RenameContactModalType) {
  const { t } = useTranslation();

  const handleSubmit = async ({ value, setError }: FormDataType) => {
    setError("");
    try {
      await renameContactHandler({ id: currentID, name: value });
      setVisible(false);
    } catch (err) {
      setError(t(err));
    }
  };

  return (
    <ModalCustom
      title={t("modal.rename-contact")}
      text={t("modal.rename-contact-text")}
      line={true}
      visible={visible}
      handleClose={() => setVisible(false)}
    >
      <Form
        buttonText={t("modal.rename-contact-btn")}
        placeholder={t("modal.rename-contact-label")}
        valueField={currentName}
        handler={handleSubmit}
      />
    </ModalCustom>
  );
}
