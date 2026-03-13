-- name: CreateUser :one
INSERT INTO users(id, name)
VALUES (sqlc.arg(id), sqlc.arg(name))
RETURNING id, name, updated_at, created_at;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;

-- name: UpdateUser :exec
UPDATE users
SET name = sqlc.arg(name), updated_at = sqlc.arg(updated_at)
WHERE id = sqlc.arg(id);
