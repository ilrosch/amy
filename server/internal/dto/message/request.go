package message

import "github.com/google/uuid"

type (
	AddMessageRequest struct {
		ID       uuid.UUID `json:"id" validate:"required"`
		UserFrom uuid.UUID `json:"user_from" validate:"required"`
		UserTo   uuid.UUID `json:"user_to" validate:"required"`
		ChatID   uuid.UUID `json:"chat_id" validate:"required"`
		Content  string    `json:"content" validate:"required"`
	}

	AddMessageStatusRequest struct {
		ID       uuid.UUID `json:"id" validate:"required"`
		UserFrom uuid.UUID `json:"user_from" validate:"required"`
		UserTo   uuid.UUID `json:"user_to" validate:"required"`
		ChatID   uuid.UUID `json:"chat_id" validate:"required"`
		Status   string    `json:"status" validate:"required"`
	}
)
