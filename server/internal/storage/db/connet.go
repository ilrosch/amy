package db

import (
	"amybackend/internal/config"
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	log "github.com/sirupsen/logrus"
)

type DBConnect struct {
	Pool *pgxpool.Pool
	Q    *Queries
}

func Connect(cfg *config.DatabaseConfig) (*DBConnect, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	poolConfig, err := pgxpool.ParseConfig(fmt.Sprintf(
		"host=%v port=%v user=%v password=%v dbname=%v sslmode=%v",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.Name, cfg.SSL,
	))
	if err != nil {
		return nil, fmt.Errorf("failed to parse db config: %w", err)
	}

	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("failed ping to db: %w", err)
	}

	log.WithFields(log.Fields{
		"HOST":    cfg.Host,
		"PORT":    cfg.Port,
		"DB_NAME": cfg.Name,
	}).Info("connection to db established")

	return &DBConnect{
		Pool: pool,
		Q:    New(pool),
	}, nil
}

func (db *DBConnect) Close() {
	if db.Pool != nil {
		db.Pool.Close()
		log.Info("connection pool to db closed")
	}
}

func (db *DBConnect) WithTx(ctx context.Context, isolation pgx.TxIsoLevel, fn func(ctx context.Context, qtx *Queries) error) error {
	tx, err := db.Pool.BeginTx(ctx, pgx.TxOptions{IsoLevel: isolation})
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer func() {
		_ = tx.Rollback(ctx)
	}()

	qtx := db.Q.WithTx(tx)

	if err = fn(ctx, qtx); err != nil {
		return fmt.Errorf("failed transaction function: %w", err)
	}

	if err = tx.Commit(ctx); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}
