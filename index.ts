import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
import { red, green } from "https://deno.land/std/fmt/colors.ts";

async function createServer() {
    const args = parse(Deno.args, {
        default: {
            port: 8080,
        },
    });

    // Allow a user to set what directory to serve files from
    if (args._.length === 1) {
        const directoryArg = args._[0];
        try {
            const fullPath = await Deno.realPath(String(directoryArg));
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
            req.respond({
                status: 200,
            });
            continue;
        }

        const logRequest = createLogRequest(req);

        let handlerPath;
        try {
            handlerPath = await getHandlerPath(req.url);
        } catch (error) {
            req.respond({
                status: 404,
                body: `Error: No handler for ${req.url}`,
            });
            logRequest(false);
            continue;
        }

        try {
            const handler = await import(handlerPath);

            req.respond({
                body: handler.default(req),
            });

            logRequest(true);
        } catch {
            req.respond({
                status: 500,
                body: `Error: Unable to parse handler at ${req.url}`,
            });
            logRequest(false);
        }
    }
}
if (import.meta.main) {
    createServer();
}

export async function getHandlerPath(requestUrl: string): Promise<string> {
    const requestAsFile = requestUrl.endsWith("/") ? `${requestUrl}index` : requestUrl;

    let result;
    try {
        result = await Deno.realPath("." + requestAsFile + ".ts");
    } catch {
        result = await Deno.realPath("." + `${requestUrl}/index` + ".ts");
    }

    return result;
}

function createLogRequest(req: ServerRequest): (success: boolean) => void {
    const start = performance.now();
    return (success = true) => {
        const end = performance.now();
        const msg = `${req.url} in ${end - start}ms`;
        console.log(success ? green(msg) : red(msg));
    };
}
