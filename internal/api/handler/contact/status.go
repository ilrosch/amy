package contact

import (
	"amybackend/internal/utils"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
)

func (h *ContactHandler) Status(c *fiber.Ctx) error {
	contactID, err := utils.ParseIDParam(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	_, cancel := context.WithTimeout(c.UserContext(), 3*time.Second)
	defer cancel()

	status := h.s.Status(contactID)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": status,
	})
}
