package push

import "amybackend/internal/storage/db"

type PushService struct {
	db *db.DBConnect
}

func New(db *db.DBConnect) *PushService {
	return &PushService{db: db}
}
