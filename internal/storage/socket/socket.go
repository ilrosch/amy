package socket

import (
	"sync"

	"github.com/gofiber/websocket/v2"
	"github.com/google/uuid"
)

type SocketStorage struct {
	Conn map[uuid.UUID]*websocket.Conn
	MU   sync.RWMutex
}

func New() *SocketStorage {
	return &SocketStorage{Conn: map[uuid.UUID]*websocket.Conn{}}
}
