package socket

import "amybackend/internal/storage/socket"

type SocketHandler struct {
	s *socket.SocketStorage
}

func New(s *socket.SocketStorage) *SocketHandler {
	return &SocketHandler{s: s}
}
