package user

import (
	"amybackend/internal/dto/token"
	"amybackend/internal/storage/db"
)

type (
	CreateUserResponse struct {
		User  db.User             `json:"user"`
		Token token.TokenResponse `json:"token"`
	}
)
