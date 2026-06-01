export const migration_002_chats = `
CREATE TABLE IF NOT EXISTS chats (
  id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id)
  REFERENCES contacts (chat_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
`;
// DROP TABLE chats;
