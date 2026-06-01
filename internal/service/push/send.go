package push

import (
	"amybackend/internal/dto/push"
	"context"
	"fmt"
	"time"

	"github.com/9ssi7/exponent"
	"github.com/google/uuid"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
	"gopkg.in/yaml.v2"
)

func (s *PushService) Send(userID uuid.UUID, title, body string, data map[string]string) error {
	if err := s.send(push.PushNotification{
		UserID: userID,
		Title:  title,
		Body:   body,
		Data:   exponent.Data(data),
	}); err != nil {
		return err
	}
	return nil
}

func (s *PushService) send(pushData push.PushNotification) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pushCredentials, err := s.db.Q.GetPush(ctx, pushData.UserID)
	if err != nil {
		return fmt.Errorf("failed send to notification: %w", err)
	}

	bundle := i18n.NewBundle(language.English)
	bundle.RegisterUnmarshalFunc("yaml", yaml.Unmarshal)

	bundle.MustLoadMessageFile("./internal/localize/ru.yaml")
	bundle.MustLoadMessageFile("./internal/localize/en.yaml")

	localizer := i18n.NewLocalizer(bundle, "ru")

	title, _ := localizer.Localize(&i18n.LocalizeConfig{
		MessageID: pushData.Title,
	})

	body, _ := localizer.Localize(&i18n.LocalizeConfig{
		MessageID: pushData.Body,
	})

	client := exponent.NewClient()
	tokens := make([]*exponent.Token, len(pushCredentials))

	for i, pushCredential := range pushCredentials {
		tokens[i] = exponent.MustParseToken(pushCredential.ExpoToken)
	}

	_, err = client.PublishSingle(ctx, &exponent.Message{
		To:        tokens,
		Body:      body,
		Data:      pushData.Data,
		Sound:     "default",
		Title:     title,
		Priority:  exponent.DefaultPriority,
		ChannelID: "default",
	})

	if err != nil {
		return fmt.Errorf("failed notification: %w", err)
	}

	// for _, receipt := range res {
	// 	if receipt.IsOk() {
	// 		println("Notification sent successfully")
	// 	} else {
	// 		println("Notification failed")
	// 	}
	// }

	return nil
}
