# rslox-play

### Usage

Running locally requires `rust` (with `cargo`) and `npm` (version 7.0+ or with `yarn`).

To build the WASM bindings, you will need `wasm-pack` installed:
```
$ cargo install wasm-pack
```

Build the rslox WASM bindings:
```
$ yarn build:lib
```

Then run the local development server:
```
$ yarn dev
```