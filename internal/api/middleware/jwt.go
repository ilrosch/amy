package middleware

import (
	"amybackend/internal/config"
	"amybackend/internal/service/token"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func JWTMiddleware(cfg *config.JWTConfig, s *token.TokenService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var tokenString string

		tokenString = c.Get("Authorization")
		if strings.HasPrefix(tokenString, "Bearer ") {
			tokenString = strings.TrimSpace(strings.TrimPrefix(tokenString, "Bearer "))
		}

		if tokenString == "" {
			tokenString = c.Query("token")
		}

		if tokenString == "" {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		claims, err := s.Parse(tokenString)
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		c.Locals("userID", claims.ID)

		return c.Next()
	}
}
