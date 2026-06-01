package socket

import (
	"amybackend/internal/service/user"
	"amybackend/internal/storage/socket"
)

type SocketService struct {
	storage *socket.SocketStorage
	us      *user.UserService
}

func New(storage *socket.SocketStorage, us *user.UserService) *SocketService {
	return &SocketService{storage: storage, us: us}
}
