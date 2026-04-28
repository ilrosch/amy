const queries = {
  chat: {
    clear: 'DELETE FROM messages WHERE chat_id=?',
    create: 'INSERT INTO chats (id) VALUES (?) ON CONFLICT (id) DO NOTHING;',
    delete: 'DELETE FROM chats WHERE id = ?',
    get: 'SELECT chats.id, contacts.name FROM chats LEFT JOIN contacts ON chats.id = contacts.chat_id WHERE chats.id = ?',
    getAll:
      'SELECT chats.id, contacts.name FROM chats LEFT JOIN contacts ON chats.id = contacts.chat_id',
    drop: 'DROP TABLE chats',
  },
  contact: {
    add: 'INSERT INTO contacts (id, name, status, chat_id) VALUES (?, ?, ?, ?) ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;',
    delete: 'DELETE FROM contacts WHERE id=?',
    rename: 'UPDATE contacts SET name=? WHERE id=?',
    getAll: 'SELECT id, name, status, chat_id FROM contacts',
    drop: 'DROP TABLE contacts',
    updateStatus: 'UPDATE contacts SET status=? WHERE id=?',
  },
  message: {
    add: 'INSERT INTO messages (id, user_from, user_to, chat_id, content, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    getLimit: 'SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    getLast: 'SELECT body FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 1',
    getPending: 'SELECT * FROM messages WHERE chat_id = ? AND status = "pending"',
    status: 'UPDATE messages SET status = ? WHERE id IN (?)',
    getByIDS:
      'SELECT id, user_from, user_to, chat_id, content, created_at FROM messages WHERE id IN (?)',
  },
};

export default queries;
