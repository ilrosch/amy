-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS push_notifications(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    expo_token VARCHAR(155) NOT NULL,
    user_lang VARCHAR(10) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_push_notification_user ON push_notifications(user_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS push_notifications;
-- +goose StatementEnd