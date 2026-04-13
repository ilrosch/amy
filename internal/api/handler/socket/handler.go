package socket

import (
	"amybackend/internal/service/peer"
	"amybackend/internal/service/sync"
	"amybackend/internal/storage/socket"
)

type SocketHandler struct {
	s    *socket.SocketStorage
	sync *sync.SyncService
	peer *peer.PeerService
}

func New(s *socket.SocketStorage, sync *sync.SyncService, peer *peer.PeerService) *SocketHandler {
	return &SocketHandler{s: s, sync: sync, peer: peer}
}
