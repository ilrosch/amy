package message

import (
	"amybackend/internal/dto/message"
	"amybackend/internal/storage/db"
	"context"
	"encoding/json"
	"fmt"
	"time"
)

func (s *MessageService) Add(data json.RawMessage) error {
	var msg message.AddMessageRequest
	if err := json.Unmarshal(data, &msg); err != nil {
		return fmt.Errorf("failed to parse message: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := s.DB.Q.AddMessage(ctx, db.AddMessageParams{
		ID:       msg.ID,
		UserFrom: msg.UserFrom,
		UserTo:   msg.UserTo,
		ChatID:   msg.ChatID,
		Content:  msg.Content,
	}); err != nil {
		return fmt.Errorf("failed to save message: %w", err)
	}

	go s.push.Send(msg.UserTo, "newMessage", "newMessageBody", map[string]string{})

	return nil
}

func (s *MessageService) AddStatus(data json.RawMessage) error {
	var msg message.AddMessageStatusRequest
	if err := json.Unmarshal(data, &msg); err != nil {
		return fmt.Errorf("failed to parse message status: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := s.DB.Q.AddMessageStatus(ctx, db.AddMessageStatusParams{
		ID:       msg.ID,
		UserFrom: msg.UserFrom,
		UserTo:   msg.UserTo,
		ChatID:   msg.ChatID,
		Status:   msg.Status,
	}); err != nil {
		return fmt.Errorf("failed to save message status: %w", err)
	}

	return nil
}
