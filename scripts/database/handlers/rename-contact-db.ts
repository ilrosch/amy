import { db } from "../init";
import { ContactType } from "./add-contact-db";
import reqs from "./reqs";

const renameContactDB = async ({ id, name }: ContactType) => {
  try {
    const stmt = await db.prepareAsync(reqs.renameContact);
    await stmt.executeAsync(name, id);
    await stmt.finalizeAsync();
  } catch (err) {
    console.log("Add contact DB: ", err.code);
    switch (err.code) {
      case "ERR_INTERNAL_SQLITE_ERROR":
        throw "";
      default:
        throw err;
    }
  }
};

export default renameContactDB;
