import { ServerRequest } from "https://deno.land/std/http/server.ts";
export default (req: ServerRequest) => {
  return `Soooo small!!\n${req.url}`;
};
