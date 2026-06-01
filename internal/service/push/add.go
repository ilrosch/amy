package push

import (
	"amybackend/internal/dto/push"
	"amybackend/internal/storage/db"
	"context"
	"fmt"
)

func (s *PushService) Add(ctx context.Context, credential push.PushNotificationCredential) error {
	if err := s.db.Q.AddPush(ctx, db.AddPushParams{
		UserID:    credential.UserID,
		UserLang:  credential.UserLang,
		ExpoToken: string(credential.ExpoToken),
	}); err != nil {
		return fmt.Errorf("failed save push credential db: %w", err)
	}

	return nil
}
