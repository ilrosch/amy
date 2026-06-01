package contact

import (
	"amybackend/internal/service/contact"
)

type ContactHandler struct {
	s *contact.ContactService
}

func New(s *contact.ContactService) *ContactHandler {
	return &ContactHandler{
		s: s,
	}
}
