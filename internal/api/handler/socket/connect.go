package socket

import (
	"context"
	"encoding/json"

	ws "github.com/gofiber/websocket/v2"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type SocketRequest struct {
	Type    string          `json:"type" validate:"required"`
	Payload json.RawMessage `json:"payload,omitempty"`
}

func (h *SocketHandler) Connect(c *ws.Conn) {
	userID := c.Locals("userID").(uuid.UUID)

	h.s.AddConnection(userID, c)
	defer h.s.DeleteConnection(userID)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		if err := h.sync.ContactSync(ctx, userID); err != nil {
			log.WithError(err).Warn("failed sync contacts")
		}
	}()

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

		log.Printf("%s", data)

		var request *SocketRequest
		if err = json.Unmarshal(data, &request); err != nil {
			log.WithError(err).Warn("failed to parse data")
			continue
		}

		switch request.Type {
		case "peer":
			log.WithFields(log.Fields{
				"type":    request.Type,
				"payload": request.Payload,
				"user_id": userID,
			}).Debug("peer connection")

			if err := h.peer.ForwardSignaling(userID, request.Payload); err != nil {
				log.WithError(err).Warn("fail signal")
			}
		default:
			log.WithFields(log.Fields{
				"mt":      mt,
				"type":    request.Type,
				"payload": request.Payload,
			}).Warn("unknown type message")
		}
	}
}
