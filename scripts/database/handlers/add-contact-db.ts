import { db } from "../init";
import reqs from "./reqs";

export type ContactType = {
  id: string;
  name: string;
};

const addContactDB = async ({ id, name }: ContactType) => {
  try {
    const stmt = await db.prepareAsync(reqs.addContact);
    await stmt.executeAsync(id, name);
    await stmt.finalizeAsync();
  } catch (err) {
    switch (err.code) {
      case "ERR_INTERNAL_SQLITE_ERROR":
        throw "Contact is exist";
      default:
        throw err;
    }
  }
};

export default addContactDB;
