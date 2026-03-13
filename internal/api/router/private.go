package router

import (
	uh "amybackend/internal/api/handler/user"
	"amybackend/internal/api/middleware"
	"amybackend/internal/config"

	"github.com/gofiber/fiber/v2"
)

func PrivateRouter(app *fiber.App, cfg *config.Config, uh *uh.UserHandler) {
	private := app.Group("/api")

	private.Use(middleware.JWTMiddleware(&cfg.JWT))
}
