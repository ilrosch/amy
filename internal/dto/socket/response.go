package socket

type SocketResponse struct {
	Type    string `json:"type" validate:"required"`
	Payload any    `json:"payload"`
}

var (
	NewContactResponse    string = "new_contact"
	ChangeContactResponse string = "change_contact"
	ContactsResponse      string = "contacts"

	PeerClose string = "peer_close"
)
