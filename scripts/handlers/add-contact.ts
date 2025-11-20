import axiosInstance from "@/lib/clients/axios";
import routes from "@/lib/routes";
import addContactDB from "../database/handlers/add-contact-db";
import { store } from "@/lib/store";
import { addContact } from "@/lib/store/slices/contacts";

const addContactHandler = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(routes.addContact(id));
    await addContactDB(data);
    store.dispatch(addContact(data));
  } catch (err) {
    console.log("Failed add contact: ", err);
    throw err;
  }
};

export default addContactHandler;
