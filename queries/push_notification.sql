-- name: AddPush :exec
INSERT INTO push_notifications (user_id, expo_token, user_lang)
VALUES (sqlc.arg(user_id), sqlc.arg(expo_token), sqlc.arg(user_lang));

-- name: GetPush :many
SELECT
    p.user_id AS user_id,
    p.expo_token AS expo_token,
    p.user_lang AS user_lang
FROM push_notifications AS p
WHERE p.user_id = $1;
