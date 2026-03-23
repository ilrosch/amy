package socket

import (
	"amybackend/internal/service/sync"
	"amybackend/internal/storage/socket"
)

type SocketHandler struct {
	s    *socket.SocketStorage
	sync *sync.SyncService
}

func New(s *socket.SocketStorage, sync *sync.SyncService) *SocketHandler {
	return &SocketHandler{s: s, sync: sync}
}
