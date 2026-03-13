package middleware

import (
	"amybackend/internal/config"
	"amybackend/internal/service/token"

	"github.com/gofiber/fiber/v2"
)

func JWTMiddleware(cfg *config.JWTConfig, s *token.TokenService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenString := c.Query("token", "")
		claims, err := s.Parse(tokenString)
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		c.Locals("userID", claims.ID)

		return c.Next()
	}
}
