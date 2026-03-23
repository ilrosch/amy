package contact

import "github.com/google/uuid"

type AddRequest struct {
	ContactID uuid.UUID `json:"contact_id" validate:"required"`
}
