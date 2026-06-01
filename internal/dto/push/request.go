package push

import (
	"github.com/9ssi7/exponent"
	"github.com/google/uuid"
)

type (
	PushNotificationCredential struct {
		UserID    uuid.UUID      `json:"user_id,omitempty"`
		ExpoToken exponent.Token `json:"expo_token" validate:"required"`
		UserLang  string         `json:"user_lang" validate:"required"`
	}

	PushNotification struct {
		UserID uuid.UUID     `json:"user_id" validate:"required"`
		Title  string        `json:"title,omitempty"`
		Body   string        `json:"body,omitempty"`
		Data   exponent.Data `json:"data,omitempty"`
	}
)
