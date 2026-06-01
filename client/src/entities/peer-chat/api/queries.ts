export const GET_MESSAGES = `
SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?;
`;

export const SAVE_MESSAGE = `
INSERT INTO messages (id, user_from, user_to, chat_id, content, status, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
`;

export const UPDATE_STATUS = `
UPDATE messages SET status = ? WHERE id = ?;
`;
