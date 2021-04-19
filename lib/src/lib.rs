mod utils;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn disassemble(script: &str) -> String {
    match rslox::compiler::compile(script) {
        Ok(func) => {
            let mut out = String::new();
            rslox::chunk::disassemble_chunk(&mut out, &func.chunk, "test").unwrap();
            out
        }
        Err(err) => format!("{}", err),
    }
}

#[wasm_bindgen]
pub fn interpret(script: &str) -> String {
    match rslox::compiler::compile(script) {
        Ok(func) => {
            let mut vm = rslox::vm::Vm::new();
            match vm.interpret(func) {
                Ok(..) => vm.output,
                Err(err) => format!("{}", err),
            }
        }
        Err(err) => format!("{}", err),
    }
}

#[wasm_bindgen]
pub fn setup() {
    log("RSLox initialized");
    utils::set_panic_hook();
}
