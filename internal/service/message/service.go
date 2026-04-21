package message

import (
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
}

func New(db *db.DBConnect, s *storage.SocketStorage, su *user.UserService, serSocket *socket.SocketService) *MessageService {
	return &MessageService{DB: db, storage: s, serUser: su, serSocket: serSocket}
}
