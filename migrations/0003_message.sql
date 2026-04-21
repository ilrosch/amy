-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS messages(
    id UUID NOT NULL,
    user_from UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_to UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    chat_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY(id, user_from, user_to)
);

CREATE INDEX idx_messages_user_from ON messages(user_from);
CREATE INDEX idx_messages_user_to ON messages(user_to);


CREATE TABLE IF NOT EXISTS message_statuses(
    id UUID NOT NULL,
    user_from UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_to UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    chat_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY(id, user_from, user_to)
);

CREATE INDEX idx_messages_statuses_user_from ON message_statuses(user_from);
CREATE INDEX idx_message_statuses_user_to ON message_statuses(user_to);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS message_statuses;
-- +goose StatementEnd