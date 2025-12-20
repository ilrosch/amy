const reqs = {
  addContact: 'INSERT INTO contacts (id, name) VALUES (?, ?)',
  renameContact: 'UPDATE contacts SET name=? WHERE id=?',
  removeContact: 'DELETE FROM contacts WHERE id=?',
  getContacts: 'SELECT id, name FROM contacts',
  createChat: 'INSERT INTO chats (id, user_id) VALUES (?, ?)',
  getChats: 'SELECT chats.id, contacts.name FROM chats LEFT JOIN contacts ON chats.user_id = contacts.id',
  getInfoChat:
    'SELECT chats.id, contacts.name FROM chats LEFT JOIN contacts ON chats.user_id = contacts.id WHERE chats.id = ?',
  getMessages: 'SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
  addMessage:
    'INSERT INTO messages (id, body, status, chat_id, from_id, to_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
  isChatExists: 'SELECT EXISTS (SELECT 1 FROM chats WHERE id = ?)',
  getLastMessage: 'SELECT body FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 1',
  removeUserMessage: 'DELETE FROM messages WHERE chat_id=?',
  removeChat: 'DELETE FROM chats WHERE id = ?',
} as const;

export default reqs;
