package contact

import (
	"amybackend/internal/service/socket"
	"amybackend/internal/service/user"
	"amybackend/internal/storage/db"
	storage "amybackend/internal/storage/socket"
)

type ContactService struct {
	DB        *db.DBConnect
	storage   *storage.SocketStorage
	serSocket *socket.SocketService
	serUser   *user.UserService
}

func New(db *db.DBConnect, s *storage.SocketStorage, su *user.UserService, serSocket *socket.SocketService) *ContactService {
	return &ContactService{DB: db, storage: s, serUser: su, serSocket: serSocket}
}
