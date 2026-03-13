package main

import (
	"amybackend/internal/api/router"
	"amybackend/internal/config"
	"amybackend/internal/db"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

func init() {
	log.SetFormatter(&log.TextFormatter{
		ForceColors:     true,
		ForceQuote:      true,
		TimestampFormat: "2006-01-02 15:04:05",
		FullTimestamp:   true,
		PadLevelText:    true,
	})

	fileENVs := []string{".env"}
	if err := godotenv.Load(fileENVs...); err != nil {
		log.WithError(err).Fatal("not found .env file")
	}
}

func main() {
	// config app
	cfg := config.Load()
	v := validator.New()

	// connect database
	database, err := db.Connect(&cfg.DB)
	if err != nil {
		log.WithError(err).Fatal("failed init db")
	}
	defer database.Close()

	// init fiber app
	app := fiber.New(fiber.Config{
		Prefork:       true,
		CaseSensitive: true,
		StrictRouting: true,
		AppName:       "Amy (server)",
	})

	router.Setup(app, cfg, database, v)

	log.Fatal(app.Listen(":3000"))
}
