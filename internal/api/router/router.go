package router

import (
	sh "amybackend/internal/api/handler/socket"
	uh "amybackend/internal/api/handler/user"

	"amybackend/internal/api/middleware"
	"amybackend/internal/config"
	ts "amybackend/internal/service/token"
	us "amybackend/internal/service/user"
	"amybackend/internal/storage/db"
	"amybackend/internal/storage/socket"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App, cfg *config.Config, db *db.DBConnect, v *validator.Validate) {
	// services
	tService := ts.New(&cfg.JWT)
	uService := us.New(db, tService)

	// storage
	socketStore := socket.New()

	// handlers
	uHandler := uh.New(uService, v)
	sHandler := sh.New(socketStore)

	// general middleware
	middleware.Setup(app)

	// routes app
	PublicRouter(app, uHandler)
	PrivateRouter(app, cfg, tService, uHandler)
	SocketRouter(app, cfg, tService, sHandler)
}
