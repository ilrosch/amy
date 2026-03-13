package user

import (
	"github.com/gofiber/fiber/v2"
	log "github.com/sirupsen/logrus"
)

type RefreshTokenRequest struct {
	Token string `json:"access_token" validate:"required"`
}

func (h *UserHandler) RefreshToken(c *fiber.Ctx) error {
	var request RefreshTokenRequest
	if err := c.BodyParser(&request); err != nil {
		log.WithError(err).Error("failed parsed data")
		return c.SendStatus(fiber.StatusBadRequest)
	}

	token, err := h.s.Token.Refresh(request.Token)
	if err != nil {
		log.WithError(err).Error("failed refresh token")
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"access_token": token})
}
