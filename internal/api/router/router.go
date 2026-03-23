package router

import (
	ch "amybackend/internal/api/handler/contact"
	sh "amybackend/internal/api/handler/socket"
	uh "amybackend/internal/api/handler/user"

	"amybackend/internal/api/middleware"
	"amybackend/internal/config"
	cs "amybackend/internal/service/contact"
	ss "amybackend/internal/service/socket"
	sy "amybackend/internal/service/sync"
	ts "amybackend/internal/service/token"
	us "amybackend/internal/service/user"

	"amybackend/internal/storage/db"
	"amybackend/internal/storage/socket"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App, cfg *config.Config, db *db.DBConnect, v *validator.Validate) {
	// storage
	socketStore := socket.New()

	// services
	tService := ts.New(&cfg.JWT)
	uService := us.New(db, tService)
	sService := ss.New(socketStore, uService)
	cService := cs.New(db, socketStore, uService, sService)

	syncService := sy.New(cService, socketStore)

	// handlers
	uHandler := uh.New(uService, v)
	sHandler := sh.New(socketStore, syncService)
	cHandler := ch.New(cService)

	// general middleware
	middleware.Setup(app)
	middleJWT := middleware.JWTMiddleware(&cfg.JWT, tService)

	// routes app
	appGroup := app.Group("/api")
	UserRouter(appGroup, middleJWT, uHandler)
	ContactRouter(appGroup, middleJWT, cHandler)
	SocketRouter(appGroup, middleJWT, sHandler)
}
