# Amy server

The coordination server provides logical linking of network nodes, centralized authentication and signaling, acting as a critical infrastructure element of the messenger architecture.

---

## Usage

1. Clone repository:
```
git clone -b backend --single-branch git@github.com:ilrosch/amy.git
```

2. Create and setup .env file:
```
cd /backend

cp .env.example .env

nano .env
# vim .env
```

3. Run server:
```
docker compose --env-file .env up -d
```
