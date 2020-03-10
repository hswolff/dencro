# dencro

an adaptation of [micro](https://github.com/zeit/micro) for [deno](https://deno.land/)

Except this one will serve any handlers it finds on the file system that mirror the request.

## Usage

```sh
deno --allow-net --allow-read index.ts <directoryToServeFiles> [--port 8080]
```

## Todo

- [x] Add [command line argument parsing](https://deno.land/std/flags/)
  - So we can set the port
- [x] Load `index.ts` by default if no handler is given as an argument
- [x] Walk folders to load all `.ts` files as handlers
- [x] Set what folder to use as current working directory
- [ ] Have handlers support returning:
  - [ ] JSON
  - [ ] Templates
- [ ] Write tests
