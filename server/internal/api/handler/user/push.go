package user

import (
	"amybackend/internal/dto/push"
	"amybackend/internal/utils"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	log "github.com/sirupsen/logrus"
)

func (h *UserHandler) Push(c *fiber.Ctx) error {
	userID, err := utils.ParseUserIDLocal(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).SendString(err.Error())
	}

	var pushCredential push.PushNotificationCredential
	if err := c.BodyParser(&pushCredential); err != nil {
		log.WithError(err).Warn("failed parse push credential")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	pushCredential.UserID = userID

	ctx, cancel := context.WithTimeout(c.Context(), 3*time.Second)
	defer cancel()

	if err := h.push.Add(ctx, pushCredential); err != nil {
		log.WithError(err).Error("failed add push credential")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.SendStatus(fiber.StatusCreated)
}
