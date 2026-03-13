-- name: CreateUser :one
INSERT INTO users(id, name)
VALUES (sqlc.arg(id), sqlc.arg(name))
RETURNING id, name, updated_at, created_at;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;
