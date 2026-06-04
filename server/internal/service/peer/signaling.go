package peer

import (
	"amybackend/internal/dto/socket"
	"encoding/json"
	"fmt"

	"github.com/google/uuid"
)

type Signal struct {
	Type    string          `json:"type" validate:"required"`
	UserID  uuid.UUID       `json:"user_id" validate:"required"`
	Payload json.RawMessage `json:"payload"`
}

func (s *PeerService) ForwardSignaling(t string, userFrom uuid.UUID, request json.RawMessage) error {
	var signal Signal

	if err := json.Unmarshal(request, &signal); err != nil {
		_ = s.SendClose(userFrom, signal.UserID)
		return fmt.Errorf("failed parse signal: %w", err)
	}

	if err := s.v.Struct(signal); err != nil {
		_ = s.SendClose(userFrom, signal.UserID)
		return fmt.Errorf("invalid status signal: %v", signal.Type)
	}

	if err := s.storage.Send(signal.UserID, &socket.SocketResponse{
		Type: t,
		Payload: Signal{
			Type:    signal.Type,
			UserID:  userFrom,
			Payload: signal.Payload,
		},
	}); err != nil {
		_ = s.SendClose(userFrom, signal.UserID)
		return fmt.Errorf("failed send signal to user: %w", err)
	}

	return nil
}

func (s *PeerService) SendClose(userFrom, userTo uuid.UUID) error {
	return s.storage.Send(userFrom, &socket.SocketResponse{
		Type: "peer",
		Payload: struct {
			Type   string    `json:"type"`
			UserID uuid.UUID `json:"user_id"`
		}{
			Type:   socket.PeerClose,
			UserID: userTo,
		},
	})
}
