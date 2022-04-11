env:
	cp .env.example .env

start:
	docker-compose up -d --build
