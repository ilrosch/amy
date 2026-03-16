package user

import (
	"amybackend/internal/dto/user"
	"amybackend/internal/storage/db"
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *UserService) Update(ctx context.Context, userID uuid.UUID, userData *user.CreateUserRequest) error {
	params := db.UpdateUserParams{
		ID:   userID,
		Name: userData.Name,
		UpdatedAt: pgtype.Timestamptz{
			Time:  time.Now(),
			Valid: true,
		},
	}
	if err := s.DB.Q.UpdateUser(ctx, params); err != nil {
		return fmt.Errorf("failed to update user db: %w", err)
	}

	return nil
}
