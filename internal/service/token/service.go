package token

import "amybackend/internal/config"

type TokenService struct {
	cfg *config.JWTConfig
}

func New(cfg *config.JWTConfig) *TokenService {
	return &TokenService{cfg: cfg}
}
