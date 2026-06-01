export const migration_001_contacts = `
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  chat_id TEXT NOT NULL UNIQUE,
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
// DROP TABLE contacts;
