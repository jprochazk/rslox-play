mod utils;
use rslox::{
    compiler::compile,
    value::{Object, Value},
    vm::{self, Vm},
};
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = ["window", "Date"])]
    fn now() -> f64;
}

#[wasm_bindgen]
pub fn disassemble(script: &str) -> String {
    match compile(script) {
        Ok(func) => {
            let mut out = String::new();
            rslox::chunk::disassemble_chunk(&mut out, &func.chunk, "test").unwrap();
            out
        }
        Err(err) => format!("{}", err),
    }
}

fn clock_wrapper(_vm: &mut Vm, _args: Vec<Value>) -> vm::Result<Value> {
    Ok(Value::Number(now() / 1000.0))
}

fn str_wrapper(vm: &mut Vm, args: Vec<Value>) -> vm::Result<Value> {
    if args.len() != 1 {
        return Err(vm.error(&format!("Invalid number of args: {}", args.len())));
    }
    Ok(Value::object(Object::String(format!("{}", args[0]))))
}

fn panic_wrapper(vm: &mut Vm, args: Vec<Value>) -> vm::Result<Value> {
    if args.len() == 1 {
        if let Value::Object(object) = &args[0] {
            if let Object::String(string) = &(*object.borrow()) {
                return Err(vm.error(string));
            }
        }
    }
    Err(vm.error("Error with no message"))
}

fn log_wrapper(_vm: &mut Vm, args: Vec<Value>) -> vm::Result<Value> {
    let mut iter = args.iter().peekable();
    while let Some(arg) = iter.next() {
        print!("{}", arg);
        if iter.peek().is_some() {
            print!(" ");
        } else {
            println!();
        }
    }
    Ok(Value::Nil)
}

fn init() -> Vm {
    let mut vm = Vm::new();
    vm.define_native_fn("clock", clock_wrapper);
    vm.define_native_fn("str", str_wrapper);
    vm.define_native_fn("panic", panic_wrapper);
    vm.define_native_fn("log", log_wrapper);
    vm
}

#[wasm_bindgen]
pub fn interpret(script: &str) -> String {
    match rslox::compiler::compile(script) {
        Ok(func) => {
            let mut vm = init();
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
