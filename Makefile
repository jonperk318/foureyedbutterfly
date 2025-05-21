default: restart

build:
	npm --prefix ./client run build

watch:
	npm --prefix ./client run watch

restart:
	npm --prefix ./api run restart
	service nginx reload --watch

start:
	make start_backend
	make start_frontend

start_backend:
	npm --prefix ./api run start
	service nginx start --watch
	
start_frontend:
	npm --prefix ./client run watch

stop:
	npm --prefix ./api run stop
	service nginx stop

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

dev:
	make -j 2 dev_client dev_api

dev_pm2:
	make -j 2 dev_client dev_api_pm2

dev_client:
	npm --prefix ./client run dev

dev_api:
	npm --prefix ./api run dev

dev_api_pm2:
	npm --prefix ./api run start
