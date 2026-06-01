package user

import (
	"amybackend/internal/storage/db"
	"context"

	"github.com/google/uuid"
)

func (s *UserService) Get(ctx context.Context, userID uuid.UUID) (*db.User, error) {
	userData, err := s.DB.Q.GetUser(ctx, userID)
	if err != nil {
		return nil, err
	}
	return &userData, err
}
