import * as SQLite from "expo-sqlite";
import createContactsTable from "./create-tables/contacts";

export const db = SQLite.openDatabaseSync("amy-client");

const initDB = async () => {
  try {
    await createContactsTable(db);
  } catch (err) {
    console.log(err);
  }
};

export default initDB;
