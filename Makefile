default: build

build:
	npm --prefix ./client run build
	make restart

restart:
	pm2 restart 0 --watch
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

run:
	make -j 2 run_client run_api

run_client:
	npm --prefix ./client run dev

run_api:
	npm --prefix ./api start
