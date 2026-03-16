package user

import (
	"amybackend/internal/service/token"
	"amybackend/internal/storage/db"
)

type UserService struct {
	DB    *db.DBConnect
	Token *token.TokenService
}

func New(db *db.DBConnect, ts *token.TokenService) *UserService {
	return &UserService{DB: db, Token: ts}
}
