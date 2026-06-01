package user

import (
	"amybackend/internal/dto/user"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

func (h *UserHandler) Update(c *fiber.Ctx) error {
	var userData user.CreateUserRequest
	if err := c.BodyParser(&userData); err != nil {
		log.WithError(err).Warn("failed to parse user_data")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	userID := c.Locals("userID").(uuid.UUID)

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := h.s.Update(ctx, userID, &userData); err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	log.WithField("user_id", userID).Info("update user")

	return c.SendStatus(fiber.StatusNoContent)
}
