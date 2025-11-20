import { ModalContext } from "@/app/(tabs)/_layout";
import { useContext } from "react";

const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

export default useModal;
