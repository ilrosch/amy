package socket

type SocketResponse struct {
	Type    string `json:"type" validate:"required"`
	Payload any    `json:"payload"`
}

var (
	NewContactResponse string = "new_contact"
	ContactsResponse   string = "contacts"
)
