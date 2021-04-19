// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body{margin:0;padding:0;height:100vh;overflow:hidden}.window-center.svelte-1liaun7{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%)}.code-container.svelte-1liaun7{height:50%;width:100%;display:flex}.code.svelte-1liaun7{height:100%;width:50%}.code.full.svelte-1liaun7{width:100%}.disassembly.svelte-1liaun7{height:100%;width:50%;padding:0;padding-left:5px;margin:0;border:none;resize:none}.console.svelte-1liaun7{height:20%;width:100%;resize:none}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}