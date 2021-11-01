build:
	cd CNK-backend && daml build
	cd CNK-backend && daml codegen js -o daml.js .daml/dist/*.dar
	cd CNK-backend && daml damlc visual .daml/dist/CNK-1.0.1.dar --dot CNK-Model.dot
	cd CNK-backend && dot -Tpng CNK-Model.dot > CNK-Model.png
	cd CNK-frontend && yarn install
	cd CNK-frontend && yarn build

deploy: build
	mkdir -p deploy
	cp ./.daml/dist/*.dar deploy
	# cd ui && zip -r ../deploy/CNK-Tesis-Final-CNK-frontend.zip build

clean: 
	cd CNK-backend && rm -rf .daml
	cd CNK-backend && rm -rf CNK-model.dot
	cd CNK-backend && rm -rf CNK-model.png
	cd CNK-backend && rm -rf daml.js
	rm -rf deploy
	cd CNK-frontend && rm -rf build
	cd CNK-frontend && rm -rf node_modules
	cd CNK-frontend && rm -rf yarn.lock