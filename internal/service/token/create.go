package token

import (
	"amybackend/internal/dto/token"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func (s *TokenService) Create(userID uuid.UUID) (*token.TokenResponse, error) {
	now := time.Now()
	expiresAt := now.Add(time.Duration(s.cfg.Expiration) * 24 * time.Hour)

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": userID.String(),
		"iat": now.Unix(),
		"exp": expiresAt.Unix(),
	})

	tokenString, err := t.SignedString([]byte(s.cfg.Secret))
	if err != nil {
		return nil, fmt.Errorf("failed to sign token: %w", err)
	}

	return &token.TokenResponse{
		Token:     tokenString,
		ExpiresAt: expiresAt,
	}, nil
}
