package contact

import (
	"github.com/gofiber/fiber/v2"
)

func (h *ContactHandler) GetNew(c *fiber.Ctx) error {
	// userID := c.Locals("userID").(uuid.UUID)

	// ctx, cancel := context.WithTimeout(c.UserContext(), 3*time.Second)
	// defer cancel()

	// response, err := h.s.Get(ctx, userID)
	// if err != nil {
	// 	log.WithError(err).Error("failed to get new contacts")
	// 	return c.SendStatus(fiber.StatusInternalServerError)
	// }

	// if err := c.JSON(response); err == nil {
	// 	go func(userID uuid.UUID, h *ContactHandler)  {
	// 		ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	// 		defer cancel()

	// 		if err := h.s.DelRequest(ctx, userID); err != nil {
	// 			log.WithError(err).Error("failed to delete request")
	// 		}
	// 	}(userID, h)
	// }

	return nil
}
