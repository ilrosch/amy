package user

import (
	"amybackend/internal/dto/user"
	"amybackend/internal/storage/db"
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func (s *UserService) Create(ctx context.Context, userData *user.CreateUserRequest) (*user.CreateUserResponse, error) {
	userID, err := uuid.NewV7()
	if err != nil {
		return nil, fmt.Errorf("failed to generate user_id: %w", err)
	}

	var result *user.CreateUserResponse

	err = s.DB.WithTx(ctx, pgx.ReadCommitted, func(ctx context.Context, qtx *db.Queries) error {
		u, err := qtx.CreateUser(ctx, db.CreateUserParams{
			ID:   userID,
			Name: userData.Name,
		})
		if err != nil {
			return fmt.Errorf("failed to create user db: %w", err)
		}

		token, err := s.Token.Create(userID)
		if err != nil {
			return fmt.Errorf("failed to create token: %w", err)
		}

		result = &user.CreateUserResponse{User: u, Token: *token}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return result, nil
}
