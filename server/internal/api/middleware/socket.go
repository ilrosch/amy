package middleware

import (
	"github.com/gofiber/fiber/v2"
	ws "github.com/gofiber/websocket/v2"
)

func SocketAllowed(c *fiber.Ctx) error {
	if ws.IsWebSocketUpgrade(c) {
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired
}
