default: run

build:
	npm --prefix ./client build

install:
	npm --prefix ./client install ./client
	npm --prefix ./api install ./api

run:
	make -j 2 run_client run_api

run_client:
	npm --prefix ./client run dev

run_api:
	npm --prefix ./api start
