package user

import "amybackend/internal/db"

type (
	CreateUserResponse struct {
		User  db.User `json:"user"`
		Token string  `json:"access_token"`
	}
)
