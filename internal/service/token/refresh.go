package token

import (
	"errors"

	"github.com/golang-jwt/jwt/v5"
)

func (s *TokenService) Refresh(tokenString string) (string, error) {
	claims, err := s.parse(tokenString)
	if errors.Is(err, jwt.ErrTokenExpired) {
		t, err := s.Create(claims.ID)
		return t, err
	}

	if err != nil {
		return "", err
	}

	t, err := s.Create(claims.ID)
	return t, err
}
