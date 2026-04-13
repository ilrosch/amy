package user

import (
	"amybackend/internal/service/user"
	"amybackend/internal/validator"
)

type UserHandler struct {
	s *user.UserService
	v *validator.Validator
}

func New(s *user.UserService, v *validator.Validator) *UserHandler {
	return &UserHandler{s: s, v: v}
}
