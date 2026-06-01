package sync

import (
	"amybackend/internal/dto/socket"
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
)

func (s *SyncService) MessageSync(ctx context.Context, userID uuid.UUID) error {
	if _, exists := s.storage.GetConnection(userID); !exists {
		return fmt.Errorf("user %v not connected", userID)
	}

	ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
	defer cancel()

	response, err := s.serMessage.Get(ctx, userID)
	if err != nil {
		return err
	}

	chunkSize := 5

	for i := 0; i < len(response); i += chunkSize {
		end := i + chunkSize

		if end > len(response) {
			end = len(response)
		}

		chunk := response[i:end]

		err = s.storage.Send(userID, &socket.SocketResponse{
			Type:    socket.MessagesResponse,
			Payload: chunk,
		})

		if err != nil {
			return err
		}
	}

	if err = s.serMessage.DelSync(ctx, userID); err != nil {
		return err
	}

	return nil
}
