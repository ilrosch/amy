package user

import (
	"amybackend/internal/service/push"
	"amybackend/internal/service/user"
	"amybackend/internal/validator"
)

type UserHandler struct {
	s    *user.UserService
	v    *validator.Validator
	push *push.PushService
}

func New(s *user.UserService, v *validator.Validator, push *push.PushService) *UserHandler {
	return &UserHandler{s: s, v: v, push: push}
}
