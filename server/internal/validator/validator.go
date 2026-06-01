package validator

import "github.com/go-playground/validator/v10"

type Validator struct {
	validate *validator.Validate
}

func New() *Validator {
	v := validator.New()

	return &Validator{
		validate: v,
	}
}

func (v *Validator) Struct(s interface{}) error {
	return v.validate.Struct(s)
}
