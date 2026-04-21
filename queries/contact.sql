-- name: AddContact :one
WITH inserted AS (
    INSERT INTO contacts (user_from, user_to, chat_id, status)
    VALUES (sqlc.arg(user_from), sqlc.arg(user_to), sqlc.arg(chat_id), sqlc.arg(status))
    ON CONFLICT (user_from, user_to) 
    DO UPDATE SET status = EXCLUDED.status
    RETURNING user_to, chat_id, status
)
SELECT 
    c.user_to AS id,
    c.chat_id AS chat_id,
    c.status AS status,
    u.name AS name
FROM inserted c
INNER JOIN users u ON c.user_to = u.id;

-- name: GetContacts :many
SELECT
    c.user_from AS id,
    c.status AS status,
    c.chat_id AS chat_id,
    u.name AS name
FROM contacts c
LEFT JOIN users u ON c.user_from = u.id
WHERE c.user_to = $1;

-- name: DelContacts :exec
DELETE FROM contacts
WHERE user_to = $1;

-- name: DelContact :exec
DELETE FROM contacts
WHERE user_from = $1 AND user_to = $2;

-- name: UpsertContactRequest :exec
INSERT INTO contacts (user_from, user_to, status, chat_id)
VALUES ($1, $2, $3, $4)
ON CONFLICT (user_from, user_to) 
DO UPDATE SET status = EXCLUDED.status;
