package message

import (
	"amybackend/internal/storage/db"
	"context"

	"github.com/google/uuid"
)

func (s *MessageService) Get(ctx context.Context, userID uuid.UUID) ([]db.GetMessagesRow, error) {
	messages, err := s.DB.Q.GetMessages(ctx, userID)
	if err != nil {
		return nil, err
	}

	return messages, nil
}
