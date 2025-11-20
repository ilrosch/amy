const reqs = {
  addContact: "INSERT INTO contacts (id, name) VALUES (?, ?)",
  renameContact: "UPDATE contacts SET name=? WHERE id=?",
  removeContact: "DELETE contacts WHERE id=?",
  getContacts: "SELECT id, name FROM contacts;",
} as const;

export default reqs;
