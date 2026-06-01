package user

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

func (h *UserHandler) Delete(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uuid.UUID)

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := h.s.Delete(ctx, userID); err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	log.WithField("user_id", userID).Info("delete user")

	return c.SendStatus(fiber.StatusNoContent)
}
