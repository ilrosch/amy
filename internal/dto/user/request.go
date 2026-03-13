package user

type (
	CreateUserRequest struct {
		Name string `json:"name" validate:"required,min=2,max=255"`
	}

	DeleteUserRequest struct{}
	UpdateUserRequest struct{}
)
