package contact

import (
	"amybackend/internal/dto/contact"
	"amybackend/internal/storage/db"
	"context"

	"github.com/google/uuid"
)

func (s *ContactService) Add(ctx context.Context, userFrom uuid.UUID, userTo uuid.UUID) (*contact.Contact, error) {
	chatID, err := uuid.NewV7()
	if err != nil {
		return nil, err
	}

	contactData, err := s.DB.Q.AddContact(ctx, db.AddContactParams{
		UserFrom: userFrom,
		UserTo:   userTo,
		ChatID:   chatID,
		Status:   contact.StatusNew,
	})
	if err != nil {
		return nil, err
	}

	response := contact.Contact{
		ID:     contactData.ID,
		Name:   contactData.Name,
		ChatID: contactData.ChatID,
		Status: contact.StatusPending,
	}

	go func(userFrom uuid.UUID, userTo uuid.UUID) {
		if ok := s.serSocket.SendContact(userFrom, userTo, chatID); ok {
			_ = s.DelContactRequest(userFrom, userTo)
		}
	}(userFrom, userTo)

	return &response, nil
}
