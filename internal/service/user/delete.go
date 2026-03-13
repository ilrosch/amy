package user

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

func (s *UserService) Delete(ctx context.Context, userID uuid.UUID) error {
	if err := s.DB.Q.DeleteUser(ctx, userID); err != nil {
		return fmt.Errorf("failed to delete user db: %w", err)
	}
	return nil
}
