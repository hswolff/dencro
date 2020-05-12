# dencro

an adaptation of [micro](https://github.com/zeit/micro) for [deno](https://deno.land/)

Except this one will serve any handlers it finds on the file system that mirror the request.

## Install

```sh
deno install -n dencro --allow-net --allow-read https://raw.githubusercontent.com/hswolff/dencro/master/index.ts
```

## Usage

```sh
dencro [directory] [options]
```

- `[directory]` - directory which you want to serve
- `[options]` - Aditional options
  - `--port` - set the port on which to serve

**Example:**

```sh
~ dencro . --port 8080
Serving files from: ~
Listening at http://localhost:8080/
```

## Development

- Clone the repo:

```sh
git clone https://github.com/hswolff/dencro.git
```

- run dencro:

```sh
deno run --allow-net --allow-read index.ts <directoryToServeFiles> [--port 8080]
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
