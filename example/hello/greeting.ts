import { ServerRequest } from "https://deno.land/std/http/server.ts";
export default (req: ServerRequest) => {
  return `Greetings people!!!\n${req.url}`;
};
