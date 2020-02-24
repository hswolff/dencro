import { serve } from "https://deno.land/std@v0.33.0/http/server.ts";
import { red } from "https://deno.land/std@v0.33.0/fmt/colors.ts";

if (Deno.args.length === 0 || Deno.args.length > 1) {
  console.error(red("Need a handler"));
  Deno.exit(1);
}

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

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
