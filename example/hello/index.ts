import { ServerRequest } from "https://deno.land/std/http/server.ts";
export default (req: ServerRequest) => {
  return `Hello to whee!!\n${req.url}`;
};
