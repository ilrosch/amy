package router

import (
	"amybackend/internal/api/handler/contact"

	"github.com/gofiber/fiber/v2"
)

func ContactRouter(app fiber.Router, middleJWT fiber.Handler, ch *contact.ContactHandler) {
	contactGroup := app.Group("/contact")

	contactGroup.Use(middleJWT)

	contactGroup.Get("/:id/status", ch.Status)
	contactGroup.Post("/:id/new", ch.Add)
	contactGroup.Post("/:id/accept", ch.Accept)
	contactGroup.Post("/:id/reject", ch.Reject)
}
