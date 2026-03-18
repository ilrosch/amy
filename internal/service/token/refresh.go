package token

import (
	"amybackend/internal/dto/token"
	"errors"

	"github.com/golang-jwt/jwt/v5"
)

func (s *TokenService) Refresh(tokenString string) (*token.TokenResponse, error) {
	claims, err := s.Parse(tokenString)
	if errors.Is(err, jwt.ErrTokenExpired) {
		t, err := s.Create(claims.ID)
		return t, err
	}

	if err != nil {
		return nil, err
	}

	t, err := s.Create(claims.ID)
	return t, err
}
