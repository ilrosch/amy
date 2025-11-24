import { db } from "../init";
import reqs from "./reqs";

const removeContactDB = async (id: string) => {
  try {
    console.log(id);
    const stmt = await db.prepareAsync(reqs.removeContact);
    await stmt.executeAsync(id);
    await stmt.finalizeAsync();
  } catch (err) {
    console.log("Remove contact DB: ", err.code);
    switch (err.code) {
      default:
        throw err;
    }
  }
};

export default removeContactDB;
