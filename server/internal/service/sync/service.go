package sync

import (
	"amybackend/internal/service/contact"
	"amybackend/internal/service/message"
	"amybackend/internal/storage/socket"
)

type SyncService struct {
	serContact *contact.ContactService
	storage    *socket.SocketStorage
	serMessage *message.MessageService
}

func New(sc *contact.ContactService, sm *message.MessageService, storage *socket.SocketStorage) *SyncService {
	return &SyncService{serContact: sc, serMessage: sm, storage: storage}
}
