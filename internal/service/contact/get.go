package contact

import (
	"amybackend/internal/dto/contact"
	"context"
	"fmt"

	"github.com/google/uuid"
)

func (s *ContactService) Get(ctx context.Context, userID uuid.UUID) (*[]contact.Contact, error) {
	res, err := s.DB.Q.GetContacts(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("failed get contacts db: %w", err)
	}

	response := make([]contact.Contact, len(res))
	for i, item := range res {
		response[i] = contact.Contact{
			ID:     item.ID,
			Name:   item.Name.String,
			Status: item.Status,
		}
	}

	return &response, nil
}

func (s *ContactService) GetSync(ctx context.Context, userID uuid.UUID) (*contact.ContactSync, error) {
	contacts, err := s.Get(ctx, userID)
	if err != nil {
		return nil, err
	}

	response := contact.ContactSync{
		New:      make([]contact.Contact, 0),
		Accepted: make([]uuid.UUID, 0),
		Rejected: make([]uuid.UUID, 0),
	}

	for _, item := range *contacts {
		switch item.Status {
		case contact.StatusNew:
			item.Status = contact.StatusNew
			response.New = append(response.New, item)
		case contact.StatusAccepted:
			response.Accepted = append(response.Accepted, item.ID)
		case contact.StatusRejected:
			response.Rejected = append(response.Rejected, item.ID)
		}
	}

	return &response, nil
}
