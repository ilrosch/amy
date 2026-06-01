package socket

import (
	"amybackend/internal/dto/socket"
	"fmt"
	"sync"

	ws "github.com/gofiber/websocket/v2"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type (
	SocketItem struct {
		conn *ws.Conn
		mu   sync.Mutex
	}

	SocketStorage struct {
		storage map[uuid.UUID]*SocketItem
		mu      sync.RWMutex
	}
)

func New() *SocketStorage {
	return &SocketStorage{
		storage: make(map[uuid.UUID]*SocketItem),
	}
}

func (s *SocketStorage) AddConnection(userID uuid.UUID, conn *ws.Conn) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if item, exists := s.storage[userID]; exists {
		_ = item.conn.Close()
	}

	s.storage[userID] = &SocketItem{conn: conn}
	log.WithField("user_id", userID).Info("user connected")
}

func (s *SocketStorage) DeleteConnection(userID uuid.UUID) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if item, exists := s.storage[userID]; exists {
		_ = item.conn.Close()
		delete(s.storage, userID)
		log.WithField("user_id", userID).Info("user disconnected")
	}
}

func (s *SocketStorage) GetConnection(userID uuid.UUID) (*SocketItem, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	item, exists := s.storage[userID]
	return item, exists
}

func (s *SocketStorage) Send(userID uuid.UUID, response *socket.SocketResponse) error {
	item, exists := s.GetConnection(userID)
	if !exists {
		return fmt.Errorf("user %v not connected", userID)
	}

	item.mu.Lock()
	defer item.mu.Unlock()

	return item.conn.WriteJSON(response)
}
