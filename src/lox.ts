import * as rslox from "../lib/pkg";
export async function init() {
    await rslox.default();
    rslox.setup();
}
export function disassemble(script: string): string {
    return rslox.disassemble(script);
}
export function interpret(script: string): string {
    return rslox.interpret(script);
}