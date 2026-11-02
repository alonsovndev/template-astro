.PHONY: install dev lint format test ci
install:
	npm ci
dev:
	npm run dev
lint:
	npm run lint
format:
	npm run format
test:
	npm run test
ci:
	npm run format:check
	npm run verify
