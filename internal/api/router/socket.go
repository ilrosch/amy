package router

import (
	"amybackend/internal/api/handler/socket"
	"amybackend/internal/api/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func SocketRouter(app fiber.Router, middleJWT fiber.Handler, sh *socket.SocketHandler) {
	socket := app.Group("/s")

	socket.Use(middleJWT)
	socket.Use(middleware.SocketAllowed)

	socket.Get("/connect", websocket.New(sh.Connect, websocket.Config{EnableCompression: true}))
}
