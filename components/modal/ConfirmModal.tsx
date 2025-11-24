import { useState } from "react";
import ModalCustom from "./ModalCustom";
import Btn from "../Btn";
import { useTranslation } from "react-i18next";

export type ConfirmModalType = {
  title: string;
  text: string;
  btnText: string;
  open: boolean;
  close: () => void;
  handler: () => void;
};

export default function ConfirmModal({
  title,
  text,
  btnText,
  open,
  close,
  handler,
}: ConfirmModalType) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    await handler();
    setLoading(false);
    close();
  };

  return (
    <ModalCustom
      title={t(title)}
      text={t(text)}
      line={false}
      visible={open}
      handleClose={close}
    >
      <Btn
        btnText={t(btnText)}
        color={"danger"}
        handler={handleSubmit}
        loadStatus={loading}
      />
    </ModalCustom>
  );
}
