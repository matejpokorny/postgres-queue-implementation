migrate:
	node --env-file=.env migrate.js

init:
	npm install

populate:
	node --env-file=.env populateDB.js

consume:
	node --env-file=.env consume.js
