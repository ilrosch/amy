export const GET_CHATS = `
SELECT 
  c.id AS id,
  co.name AS contactName,
  m.content AS lastMessageContent,
  m.created_at AS lastMessageAt,
  m.status AS lastMessageStatus
FROM chats c
LEFT JOIN contacts co ON co.chat_id = c.id
LEFT JOIN (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY chat_id ORDER BY created_at DESC) as rn
  FROM messages
) m ON m.chat_id = c.id AND m.rn = 1
ORDER BY m.created_at DESC;
`;

export const UPSERT_CHAT = `
INSERT INTO chats (id) VALUES (?)
ON CONFLICT (id) DO NOTHING;
`;
