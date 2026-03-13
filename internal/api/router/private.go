package router

import (
	uh "amybackend/internal/api/handler/user"
	"amybackend/internal/api/middleware"
	"amybackend/internal/config"
	"amybackend/internal/service/token"

	"github.com/gofiber/fiber/v2"
)

func PrivateRouter(app *fiber.App, cfg *config.Config, ts *token.TokenService, uh *uh.UserHandler) {
	private := app.Group("/api")

	private.Use(middleware.JWTMiddleware(&cfg.JWT, ts))

	private.Delete("/delete_user", uh.Delete)
	private.Put("/update_user", uh.Update)
}
