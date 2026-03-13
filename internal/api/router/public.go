package router

import (
	uh "amybackend/internal/api/handler/user"

	"github.com/gofiber/fiber/v2"
)

func PublicRouter(app *fiber.App, uh *uh.UserHandler) {
	public := app.Group("/pub")

	public.Post("/create_account", uh.Create)
	public.Post("/refresh_token", uh.RefreshToken)
}
