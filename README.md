# rslox-play

Running locally requires `rust` (with `cargo`) and `npm` (+ `yarn`).

To build the WASM bindings, the following cargo binaries need to be installed:
* cargo-generate
* wasm-pack

First, build the rslox WASM bindings:
```
$ yarn build:lib
```

Then run the local development server:
```
$ yarn dev
```