import { serve } from "https://deno.land/std@v0.33.0/http/server.ts";
import { red } from "https://deno.land/std@v0.33.0/fmt/colors.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

if (Deno.args.length === 0 || Deno.args.length > 2) {
  console.error(red("Need a handler"));
  Deno.exit(1);
}

let port = parse(Deno.args)['port'] || 8000;

const s = serve({ port });
console.log(`http://localhost:${port}/`);

const handlerPath = await Deno.realpath(Deno.args[0]);
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
