package token

import "time"

type TokenResponse struct {
	Token     string    `json:"access_token"`
	ExpiresAt time.Time `json:"expires_at"`
}
