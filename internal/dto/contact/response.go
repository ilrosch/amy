package contact

import "github.com/google/uuid"

type Contact struct {
	ID     uuid.UUID `json:"id" validate:"required"`
	Status string    `json:"status" validate:"required"`
	Name   string    `json:"name"`
}

type ContactSync struct {
	New      []Contact   `json:"new"`
	Accepted []uuid.UUID `json:"accepted"`
	Rejected []uuid.UUID `json:"rejected"`
}
