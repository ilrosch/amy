package message

import (
	"amybackend/internal/service/push"
	"amybackend/internal/service/socket"
	"amybackend/internal/service/user"
	"amybackend/internal/storage/db"
	storage "amybackend/internal/storage/socket"
)

type MessageService struct {
	DB        *db.DBConnect
	storage   *storage.SocketStorage
	serSocket *socket.SocketService
	serUser   *user.UserService
	push      *push.PushService
}

func New(db *db.DBConnect, s *storage.SocketStorage, su *user.UserService, serSocket *socket.SocketService, push *push.PushService) *MessageService {
	return &MessageService{DB: db, storage: s, serUser: su, serSocket: serSocket, push: push}
}
