package sync

import (
	"amybackend/internal/dto/socket"
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
)

func (s *SyncService) ContactSync(ctx context.Context, userID uuid.UUID) error {
	if _, exists := s.storage.GetConnection(userID); !exists {
		return fmt.Errorf("user %v not connected", userID)
	}

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	response, err := s.serContact.GetSync(ctx, userID)
	if err != nil {
		return err
	}

	if response.IsEmpty() {
		return nil
	}

	err = s.storage.Send(userID, &socket.SocketResponse{
		Type:    socket.ContactsResponse,
		Payload: response,
	})
	if err != nil {
		return err
	}

	if err = s.serContact.DelSync(ctx, userID); err != nil {
		return err
	}

	return nil
}
