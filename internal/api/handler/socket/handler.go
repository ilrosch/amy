package socket

import (
	"amybackend/internal/service/message"
	"amybackend/internal/service/peer"
	"amybackend/internal/service/sync"
	"amybackend/internal/storage/socket"
)

type SocketHandler struct {
	s       *socket.SocketStorage
	sync    *sync.SyncService
	peer    *peer.PeerService
	message *message.MessageService
}

func New(s *socket.SocketStorage, sync *sync.SyncService, peer *peer.PeerService, message *message.MessageService) *SocketHandler {
	return &SocketHandler{s: s, sync: sync, peer: peer, message: message}
}
