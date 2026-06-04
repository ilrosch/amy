export const UPSERT_CONTACT = `
INSERT INTO contacts (id, name, chat_id, status) VALUES (?, ?, ?, ?)
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, chat_id = EXCLUDED.chat_id;
`;

export const GET_ALL_CONTACTS = `
SELECT id, name, chat_id, status FROM contacts;
`;

export const DELETE_CONTACT = `
DELETE FROM contacts WHERE id = ?;
`;

export const UPDATE_CONTACT = `
UPDATE contacts
SET name = ?, chat_id = ?, status = ?
WHERE id = ?;
`;
