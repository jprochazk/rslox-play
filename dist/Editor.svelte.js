import './Editor.svelte.css.proxy.js';
/* src/Editor.svelte generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	attr,
	binding_callbacks,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../_snowpack/pkg/svelte/internal.js";

import monaco from "./monaco.js";
import { onMount } from "../_snowpack/pkg/svelte.js";

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "editor-container svelte-16byvel");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			/*div_binding*/ ctx[4](div);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[4](null);
		}
	};
}

function load() {
	const code = window.localStorage
	? window.localStorage.getItem("code")
	: null;

	return code !== null && code !== void 0
	? code
	: [
			"// Welcome to the Lox playground!",
			"// Use the 'examples' drop-down to explore the language",
			"class Test {",
			"   init(value) {",
			"       this.value = value;",
			"   }",
			"}",
			"var t = Test(\"hello, world!\");",
			"print t.value;"
		].join("\n");
}

function instance($$self, $$props, $$invalidate) {
	function save() {
		if (window.localStorage) {
			window.localStorage.setItem("code", editor.getValue());
		}
	}

	let container;
	let editor;
	const getValue = () => editor.getValue();
	const setValue = value => editor.setValue(value);
	const resize = () => editor.layout();

	onMount(() => {
		editor = monaco.editor.create(container, {
			value: load(),
			/* automaticLayout: true, */
			minimap: { enabled: false }
		});

		window.addEventListener("beforeunload", save);
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	return [container, getValue, setValue, resize, div_binding];
}

class Editor extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { getValue: 1, setValue: 2, resize: 3 });
	}

	get getValue() {
		return this.$$.ctx[1];
	}

	get setValue() {
		return this.$$.ctx[2];
	}

	get resize() {
		return this.$$.ctx[3];
	}
}

export default Editor;