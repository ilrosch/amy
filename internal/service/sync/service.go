package sync

import (
	"amybackend/internal/service/contact"
	"amybackend/internal/storage/socket"
)

type SyncService struct {
	serContact *contact.ContactService
	storage    *socket.SocketStorage
}

func New(sc *contact.ContactService, storage *socket.SocketStorage) *SyncService {
	return &SyncService{serContact: sc, storage: storage}
}
