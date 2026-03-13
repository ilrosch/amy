package token

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type JWTClaims struct {
	ID uuid.UUID `json:"id" validate:"required"`
	jwt.RegisteredClaims
}

func (s *TokenService) parse(tokenString string) (*JWTClaims, error) {
	var claims JWTClaims
	_, err := jwt.ParseWithClaims(tokenString, &claims, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Method)
		}
		return []byte(s.cfg.Secret), nil
	})
	return &claims, err
}
