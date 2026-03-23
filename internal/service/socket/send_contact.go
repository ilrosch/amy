package socket

import (
	"amybackend/internal/dto/contact"
	"amybackend/internal/dto/socket"
	"context"
	"time"

	"github.com/google/uuid"
)

func (s *SocketService) SendContact(userID uuid.UUID, contactID uuid.UUID) bool {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if _, exists := s.storage.GetConnection(contactID); !exists {
		return false
	}

	userData, err := s.us.Get(ctx, userID)
	if err != nil {
		return false
	}

	response := contact.Contact{
		ID:     userData.ID,
		Name:   userData.Name,
		Status: contact.StatusNew,
	}

	if err = s.storage.Send(contactID, &socket.SocketResponse{
		Type:    socket.NewContactResponse,
		Payload: response,
	}); err != nil {
		return false
	}

	return true
}
