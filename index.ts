import { serve } from "https://deno.land/std@v0.35.0/http/server.ts";
import { parse } from "https://deno.land/std@v0.35.0/flags/mod.ts";
import { red } from "https://deno.land/std@v0.35.0/fmt/colors.ts";

const args = parse(Deno.args, {
  default: {
    port: 8080
  }
});

// Allow a user to set what directory to serve files from
if (args._.length === 1) {
  const directoryArg = args._[0];
  try {
    const fullPath = await Deno.realpath(directoryArg);
    Deno.chdir(fullPath);
  } catch (error) {
    console.error(red(`Unable to serve files from: ${directoryArg}`));
  }
}

console.log("Serving files from:", Deno.cwd());

const s = serve({ port: args.port });
console.log(`Listening at http://localhost:${args.port}/`);

for await (const req of s) {
  if (req.url.endsWith("favicon.ico")) {
    req.respond({});
    continue;
  }

  console.log(req.url);

  try {
    const handler = await import(await getHandlerPath(req.url));

    req.respond({
      body: handler.default(req)
    });
  } catch (error) {
    console.error(error);
    req.respond({});
  }
}

async function getHandlerPath(requestUrl: string): Promise<string> {
  const requestAsFile = requestUrl.endsWith("/")
    ? `${requestUrl}index`
    : requestUrl;

  let result;
  try {
    result = await Deno.realpath("." + requestAsFile + ".ts");
  } catch (error) {
    result = await Deno.realpath("." + `${requestUrl}/index` + ".ts");
  }

  return result;
}
