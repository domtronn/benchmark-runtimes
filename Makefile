# Phony targets to ensure commands always run
.PHONY: install run

# Default value for ITER
ITER ?= 40

# The install command
install:
	@echo "Installing for bun..."
	cd bun && bun i

	@echo "Installing for node..."
	cd node && pnpm i

# The run command
run:
	@echo "Running main.tsx with bun..."
	cd bun && ITER=$(ITER) bun run main.tsx

	@echo "Running main.mjs with node..."
	cd node && ITER=$(ITER) node main.mjs

	@echo "Benchmarking main.tsx with deno..."
	cd deno && ITER=$(ITER) deno bench --allow-env main.tsx
