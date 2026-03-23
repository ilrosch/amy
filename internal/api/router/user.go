package router

import (
	"amybackend/internal/api/handler/user"

	"github.com/gofiber/fiber/v2"
)

func UserRouter(app fiber.Router, middleJWT fiber.Handler, uh *user.UserHandler) {
	userGroup := app.Group("/user")

	userGroup.Post("/create", uh.Create)
	userGroup.Post("/refresh", uh.RefreshToken)
	userGroup.Use(middleJWT).Delete("/delete", uh.Delete)
	userGroup.Use(middleJWT).Put("/update", uh.Update)
}
