package router

import (
	ch "amybackend/internal/api/handler/contact"
	sh "amybackend/internal/api/handler/socket"
	uh "amybackend/internal/api/handler/user"
	"amybackend/internal/validator"

	"amybackend/internal/api/middleware"
	"amybackend/internal/config"
	cs "amybackend/internal/service/contact"
	"amybackend/internal/service/peer"
	ss "amybackend/internal/service/socket"
	sy "amybackend/internal/service/sync"
	ts "amybackend/internal/service/token"
	us "amybackend/internal/service/user"

	"amybackend/internal/storage/db"
	"amybackend/internal/storage/socket"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App, cfg *config.Config, db *db.DBConnect, v *validator.Validator) {
	// storage
	socketStore := socket.New()

	// services
	tService := ts.New(&cfg.JWT)
	uService := us.New(db, tService)
	sService := ss.New(socketStore, uService)
	cService := cs.New(db, socketStore, uService, sService)

	syncService := sy.New(cService, socketStore)
	peerService := peer.New(socketStore, v)

	// handlers
	uHandler := uh.New(uService, v)
	sHandler := sh.New(socketStore, syncService, peerService)
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
