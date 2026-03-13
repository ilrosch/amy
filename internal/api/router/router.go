package router

import (
	uh "amybackend/internal/api/handler/user"
	"amybackend/internal/api/middleware"
	"amybackend/internal/config"
	"amybackend/internal/db"
	ts "amybackend/internal/service/token"
	us "amybackend/internal/service/user"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App, cfg *config.Config, db *db.DBConnect, v *validator.Validate) {
	// services
	tService := ts.New(&cfg.JWT)
	uService := us.New(db, tService)

	// handlers
	uHandler := uh.New(uService, v)

	// general middleware
	middleware.Setup(app)

	// routes app
	PublicRouter(app, uHandler)
	PrivateRouter(app, cfg, tService, uHandler)
}
