// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body{margin:0;padding:0;height:100vh;overflow:hidden}.window-center.svelte-1omcwly{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}.code-container.svelte-1omcwly{height:50%;width:100%;display:flex}.code.svelte-1omcwly{height:100%;width:50%}.code.full.svelte-1omcwly{width:100%}.disassembly.svelte-1omcwly{height:100%;width:50%;resize:none}.console.svelte-1omcwly{height:20%;width:100%;resize:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}