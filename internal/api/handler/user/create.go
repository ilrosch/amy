package user

import (
	"amybackend/internal/dto/user"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	log "github.com/sirupsen/logrus"
)

func (h *UserHandler) Create(c *fiber.Ctx) error {
	var userData user.CreateUserRequest
	if err := c.BodyParser(&userData); err != nil {
		log.WithError(err).Warn("failed to parse user_data")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if err := h.v.Struct(userData); err != nil {
		log.WithError(err).Warn("invalid user_data")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	response, err := h.s.Create(ctx, &userData)
	if err != nil {
		log.WithError(err).Error("failed to create user")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	log.WithField("user_id", response.User.ID).Info("create user")

	return c.Status(fiber.StatusCreated).JSON(response)
}
