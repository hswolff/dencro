import { ServerRequest } from "https://deno.land/std@v0.33.0/http/server.ts";
export default (req: ServerRequest) => {
  return `Soooo small!!\n${req.url}`;
};
