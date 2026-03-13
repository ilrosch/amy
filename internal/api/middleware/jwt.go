package middleware

import (
	"amybackend/internal/config"

	jwtware "github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
)

func JWTMiddleware(cfg *config.JWTConfig) fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey:  jwtware.SigningKey{Key: []byte(cfg.Secret)},
		TokenLookup: "query:token",
		ContextKey:  "user",
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			logrus.WithError(err).
				WithField("path", c.Path()).
				WithField("method", c.Method()).
				Error("JWT authentication failed")
			return c.Status(fiber.StatusUnauthorized).
				SendString("Invalid access token")
		},
	})
}
