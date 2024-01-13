migrate:
	node --env-file=.env migrate.js

init:
	npm install

generate:
	node --env-file=.env generateEvents.js

consume:
	node --env-file=.env consume.js
