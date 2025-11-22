import { ContactType } from "../database/handlers/add-contact-db";
import { store } from "@/lib/store";
import { updateContact } from "@/lib/store/slices/contacts";
import renameContactDB from "../database/handlers/rename-contact-db";

const renameContactHandler = async (contact: ContactType) => {
  try {
    await renameContactDB(contact);
    store.dispatch(updateContact({ id: contact.id, changes: contact }));
  } catch (err) {
    console.log("Failed add contact: ", err);
    throw err;
  }
};

export default renameContactHandler;
