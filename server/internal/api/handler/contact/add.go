package contact

import (
	"amybackend/internal/utils"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	log "github.com/sirupsen/logrus"
)

func (h *ContactHandler) Add(c *fiber.Ctx) error {
	contactID, err := utils.ParseIDParam(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	userID, err := utils.ParseUserIDLocal(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).SendString(err.Error())
	}

	if userID == contactID {
		log.Warn("user tried to add themselves as contact")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	ctx, cancel := context.WithTimeout(c.UserContext(), 3*time.Second)
	defer cancel()

	response, err := h.s.Add(ctx, userID, contactID)
	if err != nil {
		log.WithError(err).WithFields(log.Fields{
			"user_id":    userID,
			"contact_id": contactID,
		}).Error("failed to add contact")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(response)
}
