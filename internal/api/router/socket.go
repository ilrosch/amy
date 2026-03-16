package router

import (
	"amybackend/internal/api/handler/socket"
	"amybackend/internal/api/middleware"
	"amybackend/internal/config"
	"amybackend/internal/service/token"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func SocketRouter(app *fiber.App, cfg *config.Config, ts *token.TokenService, sh *socket.SocketHandler) {
	socket := app.Group("")

	socket.Use(middleware.JWTMiddleware(&cfg.JWT, ts))
	socket.Use(middleware.SocketAllowed)

	socket.Get("/connect", websocket.New(sh.Connect, websocket.Config{EnableCompression: true}))
}
