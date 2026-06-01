package config

import (
	"os"
	"strconv"
)

type (
	DatabaseConfig struct {
		Host     string
		Port     int
		User     string
		Password string
		Name     string
		SSL      string
	}

	JWTConfig struct {
		Secret     string
		Expiration int
	}

	Config struct {
		DB  DatabaseConfig
		JWT JWTConfig
	}
)

func Load() *Config {
	return &Config{
		DB: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnvAsInt("DB_PORT", 5432),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", ""),
			Name:     getEnv("DB_NAME", "amy"),
			SSL:      getEnv("DB_SSL_MODE", "disable"),
		},
		JWT: JWTConfig{
			Secret:     getEnv("JWT_SECRET", ""),
			Expiration: getEnvAsInt("JWT_EXPIRATION", 14),
		},
	}
}

func getEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func getEnvAsInt(name string, defaultValue int) int {
	valStr := getEnv(name, "")
	if value, err := strconv.Atoi(valStr); err == nil {
		return value
	}

	return defaultValue
}

// func getEnvAsBool(name string, defaultValue bool) bool {
// 	valStr := getEnv(name, "")
// 	if value, err := strconv.ParseBool(valStr); err == nil {
// 		return value
// 	}

// 	return defaultValue
// }
