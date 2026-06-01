package peer

import (
	"amybackend/internal/storage/socket"
	"amybackend/internal/validator"
)

type PeerService struct {
	storage *socket.SocketStorage
	v       *validator.Validator
}

func New(storage *socket.SocketStorage, v *validator.Validator) *PeerService {
	return &PeerService{
		storage: storage,
		v:       v,
	}
}
