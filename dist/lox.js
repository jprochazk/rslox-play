import * as rslox from "../lib/pkg/index.js";
export async function init() {
  await rslox.default();
  rslox.setup();
}
export function disassemble(script) {
  return rslox.disassemble(script);
}
export function interpret(script) {
  return rslox.interpret(script);
}
