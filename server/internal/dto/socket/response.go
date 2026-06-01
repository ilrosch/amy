package socket

type SocketResponse struct {
	Type    string `json:"type" validate:"required"`
	Payload any    `json:"payload"`
}

var (
	NewContactResponse      string = "new_contact"
	ChangeContactResponse   string = "change_contact"
	ContactsResponse        string = "contacts"
	MessagesResponse        string = "new_messages"
	MessageStatusesResponse string = "message_statuses"

	PeerClose string = "peer_close"
)
