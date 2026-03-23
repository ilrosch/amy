package contact

import (
	"amybackend/internal/dto/contact"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

func (h *ContactHandler) Add(c *fiber.Ctx) error {
	var request contact.AddRequest
	if err := c.BodyParser(&request); err != nil {
		log.WithError(err).Warn("failed to parse data")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	userID := c.Locals("userID").(uuid.UUID)
	if userID == request.ContactID {
		log.Warn("user tried to add themselves as contact")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	ctx, cancel := context.WithTimeout(c.UserContext(), 3*time.Second)
	defer cancel()

	response, err := h.s.Add(ctx, userID, request.ContactID)
	if err != nil {
		log.WithError(err).Error("failed to add contact")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(response)
}
