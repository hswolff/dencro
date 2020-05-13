import { ServerRequest } from "https://deno.land/std/http/server.ts";
export default (req: ServerRequest) => {
  return `What is this about??\n${req.url}`;
};
