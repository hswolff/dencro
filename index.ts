import { serve } from "https://deno.land/std@v0.33.0/http/server.ts";
const s = serve({ port: 8000 });

console.log("http://localhost:8000/");

if (Deno.args.length !== 1) {
  throw new Error("Need a handler!");
}

const handlerPath = await Deno.realpath(Deno.args[0]);
const handler = await import(handlerPath);
console.log({ handler });

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
