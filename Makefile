default: build

build:
	npm --prefix ./client run build
	make restart

restart:
	npm --prefix ./api run restart
	service nginx restart --watch

start:
	make start_frontend
	make start_backend

start_frontend:
	npm --prefix ./client run build

start_backend:
	npm --prefix ./api run start
	service nginx restart --watch

i:
	npm --prefix ./client install ./client
	npm --prefix ./api install ./api
	npm --prefix ./client install dayjs
	npm --prefix ./client install react-icons

install:
	make i

audit:
	npm --prefix ./client audit fix
	npm --prefix ./api audit fix

renew:
	sudo certbot renew --nginx

sql:
	sudo mysql -u root -p

dev:
	make -j 2 dev_client dev_api

dev_client:
	npm --prefix ./client run dev

dev_api:
	npm --prefix ./api run dev
