# dencro

an adaptation of [micro](https://github.com/zeit/micro) for [deno](https://deno.land/)

## Usage

```sh
deno --allow-net --allow-read index.ts handler.ts
```

## Todo

- [x] Add [command line argument parsing](https://deno.land/std/flags/)
  - So we can set the port
- [x] Load `index.ts` by default if no handler is given as an argument
- [x] Walk folders to load all `.ts` files as handlers
- [x] Set what folder to use as current working directory
- [ ] Write tests
