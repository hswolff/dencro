run:
	deno \
		--importmap=import_map.json \
		--allow-net \
		--allow-read \
		index.ts \
		example/handler.ts