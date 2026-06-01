-- name: AddMessage :exec
INSERT INTO messages (id, user_from, user_to, chat_id, content)
VALUES (sqlc.arg(id), sqlc.arg(user_from), sqlc.arg(user_to), sqlc.arg(chat_id), sqlc.arg(content))
ON CONFLICT (id, user_from, user_to) 
DO UPDATE SET content = EXCLUDED.content;

-- name: AddMessageStatus :exec
INSERT INTO message_statuses (id, user_from, user_to, chat_id, status)
VALUES (sqlc.arg(id), sqlc.arg(user_from), sqlc.arg(user_to),  sqlc.arg(chat_id), sqlc.arg(status))
ON CONFLICT (id, user_from, user_to) 
DO UPDATE SET status = EXCLUDED.status;

-- name: DelMessage :exec
DELETE FROM messages 
WHERE user_to = $1;

-- name: DelMessageStatus :exec
DELETE FROM message_statuses 
WHERE user_to = $1;

-- name: GetMessages :many
SELECT
    id as id,
    user_from as user_from,
    user_to as user_to,
    chat_id as chat_id,
    content as content
FROM messages
WHERE user_to = $1;

-- name: GetMessageStatuses :many
SELECT
    id as id,
    user_from as user_from,
    user_to as user_to,
    chat_id as chat_id,
    status as status
FROM message_statuses
WHERE user_to = $1;
