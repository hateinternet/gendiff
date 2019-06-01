install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish

test-piblish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test