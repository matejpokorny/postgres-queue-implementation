migrate:
	node --env-file=.env migrate.js

init:
	npm install

generate:
	node --env-file=.env generateEvents.js

generate-parallel:
	make generate & make generate & make generate & make generate & make generate

consume:
	node --env-file=.env app.js

consume-parallel:
	make consume & make consume & make consume & make consume & make consume

clean:
	node --env-file=.env clean.js