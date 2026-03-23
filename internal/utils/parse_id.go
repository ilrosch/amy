package utils

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func ParseIDParam(c *fiber.Ctx) (uuid.UUID, error) {
	idString := c.Params("id", "")
	id, err := uuid.Parse(idString)
	if err != nil {
		return uuid.Nil, fmt.Errorf("invalid ID parameter: %w", err)
	}
	return id, nil
}

func ParseUserIDLocal(c *fiber.Ctx) (uuid.UUID, error) {
	id, ok := c.Locals("userID").(uuid.UUID)
	if !ok {
		return uuid.Nil, fmt.Errorf("userID not found in locals or invalid type")
	}
	return id, nil
}
