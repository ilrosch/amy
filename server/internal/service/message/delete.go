package message

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

func (s *MessageService) DelSync(ctx context.Context, userID uuid.UUID) error {
	if err := s.DB.Q.DelMessage(ctx, userID); err != nil {
		return fmt.Errorf("failed to delete messages: %w", err)
	}
	return nil
}
