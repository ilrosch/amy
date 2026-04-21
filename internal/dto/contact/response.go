package contact

import "github.com/google/uuid"

type Contact struct {
	ID     uuid.UUID `json:"id" validate:"required"`
	Status string    `json:"status" validate:"required"`
	Name   string    `json:"name,omitempty"`
	ChatID uuid.UUID `json:"chat_id,omitempty"`
}

type ContactSync struct {
	New      []Contact   `json:"new,omitempty"`
	Accepted []uuid.UUID `json:"accepted,omitempty"`
	Rejected []uuid.UUID `json:"rejected,omitempty"`
}

func (cs ContactSync) IsEmpty() bool {
	return len(cs.New) == 0 && len(cs.Accepted) == 0 && len(cs.Rejected) == 0
}
