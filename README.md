# dencro

an adaptation of [micro](https://github.com/zeit/micro) for [deno](https://deno.land/)

## Usage

```
 deno --allow-net --allow-read index.ts handler.ts
```

## Todo

- [ ] Add [command line argument parsing](https://deno.land/std/flags/)
  - So we can set the port
- [ ] Load `index.ts` by default if no handler is given as an argument
- [ ] [Walk folders](https://deno.land/std@v0.33.0/fs/) to load all `.ts` files as handlers
- [ ] Write tests
