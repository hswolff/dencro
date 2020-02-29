import { serve } from "https://deno.land/std@v0.35.0/http/server.ts";
import { red } from "https://deno.land/std@v0.35.0/fmt/colors.ts";
import { parse } from "https://deno.land/std@v0.35.0/flags/mod.ts";

const args = parse(Deno.args, {
  default: {
    port: 8080
  }
});

const handlerFile = args._[0] ?? "index.ts";

let handlerPath;
try {
  handlerPath = await Deno.realpath(handlerFile);
} catch (error) {
  console.error(red(`No handler found. Tried loading: ${handlerFile}`));
  Deno.exit(1);
}

const s = serve({ port: args.port });
console.log(`http://localhost:${args.port}/`);

const handler = await import(handlerPath);

for await (const req of s) {
  console.log(req.url);
  if (req.url === "/") {
    req.respond({
      body: handler.default(req)
    });
  } else {
    req.respond({});
  }
}
