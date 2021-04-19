<script lang="ts">
    import monaco from "./monaco";
    import { onMount } from "svelte";

    function load() {
        const code = window.localStorage
            ? window.localStorage.getItem("code")
            : null;
        return (
            code ??
            [
                "// Welcome to the Lox playground!",
                "// Use the 'examples' drop-down to explore the language",
                "class Test {",
                "   init(value) {",
                "       this.value = value;",
                "   }",
                "}",
                'var t = Test("hello, world!");',
                "print t.value;",
            ].join("\n")
        );
    }

    function save() {
        if (window.localStorage) {
            window.localStorage.setItem("code", editor.getValue());
        }
    }

    let container: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    export const getValue = () => editor.getValue();
    export const setValue = (value: string) => editor.setValue(value);
    export const resize = () => editor.layout();
    onMount(() => {
        editor = monaco.editor.create(container, {
            value: load(),
            /* automaticLayout: true, */
            minimap: {
                enabled: false,
            },
        });

        window.addEventListener("beforeunload", save);
    });
</script>

<div class="editor-container" bind:this={container} />

<style>
    .editor-container {
        height: 100%;
        width: 100%;
    }
</style>
