import { serve } from "http/server";
import { red } from "fmt/colors";
import { parse } from "flags";

const args = parse(Deno.args, {
  default: {
    port: 8080
  }
});

if (args._.length === 0 || args._.length > 1) {
  console.error(red("Need a handler"));
  Deno.exit(1);
}

const s = serve({ port: args.port });
console.log(`http://localhost:${args.port}/`);

const handlerPath = await Deno.realpath(args._[0]);
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
