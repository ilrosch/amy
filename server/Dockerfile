FROM golang:latest AS builder

WORKDIR /build

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o ./app ./cmd/app

# min image
FROM alpine:latest

WORKDIR /amy-server
COPY --from=builder /build/app ./app

EXPOSE 3000

CMD ["./app"]