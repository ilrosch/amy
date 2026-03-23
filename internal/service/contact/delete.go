package contact

import (
	"amybackend/internal/storage/db"
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
)

func (s *ContactService) DelSync(ctx context.Context, userID uuid.UUID) error {
	if err := s.DB.Q.DelContacts(ctx, userID); err != nil {
		return fmt.Errorf("failed to delete contacts: %w", err)
	}
	return nil
}

func (s *ContactService) DelBackground(userFrom uuid.UUID, userTo uuid.UUID) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := s.DB.Q.DelContact(ctx, db.DelContactParams{
		UserFrom: userFrom,
		UserTo:   userTo,
	}); err != nil {
		return err
	}

	return nil
}
