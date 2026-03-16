package socket

import (
	"encoding/json"

	ws "github.com/gofiber/websocket/v2"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type SocketRequest struct {
	Type    string `json:"type" validate:"required"`
	Payload any    `json:"payload"`
}

func (h *SocketHandler) Connect(c *ws.Conn) {
	userID := c.Locals("userID").(uuid.UUID)

	h.s.MU.Lock()
	h.s.Conn[userID] = c
	h.s.MU.Unlock()

	defer func() {
		if err := c.Close(); err == nil {
			h.s.MU.Lock()
			delete(h.s.Conn, userID)
			h.s.MU.Unlock()

			log.WithField("user_id", userID).Info("user disconnected")
		}
	}()

	log.WithField("user_id", userID).Info("user connected")

	var (
		mt   int
		data []byte
		err  error
	)

	for {
		if mt, data, err = c.ReadMessage(); err != nil {
			if ws.IsCloseError(err, ws.CloseNormalClosure, ws.CloseAbnormalClosure) {
				// normal close connection
				break
			}

			log.WithError(err).Error("failed to read message")
			break
		}

		log.Print(mt)

		var request *SocketRequest
		if err = json.Unmarshal(data, &request); err != nil {
			log.WithError(err).Warn("failed to parse data")
			continue
		}

		switch request.Type {
		// case "":
		default:
			log.WithFields(log.Fields{
				"mt":      mt,
				"type":    request.Type,
				"payload": request.Payload,
			}).Warn("unknown type message")
		}
	}
}
