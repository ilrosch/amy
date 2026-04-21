package contact

import "github.com/google/uuid"

func (s *ContactService) Status(userID uuid.UUID) string {
	if _, isOnline := s.storage.GetConnection(userID); isOnline {
		return "online"
	}
	return "offline"
}
