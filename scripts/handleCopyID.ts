import { store } from "@/lib/store";
import * as Clipboard from "expo-clipboard";

const handleCopyID = async () => {
  const { id } = store.getState().auth;
  await Clipboard.setStringAsync(id ?? "");
  alert("Copy success!");
};

export default handleCopyID;
