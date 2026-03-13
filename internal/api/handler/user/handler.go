package user

import (
	"amybackend/internal/service/user"

	"github.com/go-playground/validator/v10"
)

type UserHandler struct {
	s *user.UserService
	v *validator.Validate
}

func New(s *user.UserService, v *validator.Validate) *UserHandler {
	return &UserHandler{s: s, v: v}
}
