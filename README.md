# Amy

A distributed messaging application built on a hybrid peer-to-peer (P2P) architecture. Main traffic (text messages, audio/video streams) is transmitted directly between users' devices, while the coordination server acts solely as a signaling node — handling authentication, connection routing, and offline message buffering. The project is optimized for self-hosting and cross-platform deployment.

---

### `server/` — coordination server

A lightweight server module responsible for signaling and session management.

- Built with Go and the high-performance Fiber web framework.
- Provides CRUD operations for user accounts, JWT-based authentication, and secure token exchange.
- Maintains persistent WebSocket connections for real-time delivery of WebRTC signaling data and system notifications.
- Includes a built-in offline message buffering mechanism: text messages and delivery statuses are temporarily stored for offline users and automatically synced upon reconnection.


### `client/` — client mobile application

A cross-platform mobile application (iOS / Android) enabling direct peer-to-peer communication with an intuitive user interface.

- Developed with React Native + Expo + TypeScript, following the Feature-Sliced Design (FSD) methodology for modular, scalable architecture.
- Establishes direct P2P connections via WebRTC (including NAT traversal and automatic ICE candidate gathering).
- Stores chat history and configuration locally in a hardware-isolated SQLite database; session keys are secured in Secure Store.


## Highlights
- Hybrid P2P architecture — reduces server load and enhances privacy (no central message storage).
- Anonymous registration — account creation without phone number or email (unique UID generation).
- Self-hosting ready — deploy the coordination server on your own infrastructure or local network.
- Guaranteed offline delivery — messages and statuses are buffered and delivered automatically upon reconnection.
- Direct media calls — low-latency audio/video communication over peer-to-peer channel.
