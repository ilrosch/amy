package contact

import (
	"amybackend/internal/dto/contact"
	"amybackend/internal/storage/db"
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
)

func (s *ContactService) Accept(ctx context.Context, userID uuid.UUID, contactID uuid.UUID) error {
	if err := s.upsertContactRequest(ctx, userID, contactID, contact.StatusAccepted); err != nil {
		return fmt.Errorf("failed to accept contact request: %w", err)
	}

	go s.notifyContactStatus(userID, contactID, contact.StatusAccepted)

	return nil
}

func (s *ContactService) Reject(ctx context.Context, userID uuid.UUID, contactID uuid.UUID) error {
	if err := s.upsertContactRequest(ctx, userID, contactID, contact.StatusRejected); err != nil {
		return fmt.Errorf("failed to reject contact request: %w", err)
	}

	go s.notifyContactStatus(userID, contactID, contact.StatusRejected)

	return nil
}

func (s *ContactService) upsertContactRequest(ctx context.Context, userFrom, userTo uuid.UUID, status string) error {
	if err := s.DB.Q.UpsertContactRequest(ctx, db.UpsertContactRequestParams{
		UserFrom: userFrom,
		UserTo:   userTo,
		Status:   status,
	}); err != nil {
		return err
	}
	return nil
}

func (s *ContactService) notifyContactStatus(userFrom, userTo uuid.UUID, status string) {
	_, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if ok := s.serSocket.SendContactStatus(userFrom, userTo, status); ok {
		_ = s.DelContactRequest(userFrom, userTo)
	}
}
