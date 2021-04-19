<script lang="ts">
    import Editor from "./Editor.svelte";
    import Loader from "./Loader.svelte";
    import * as lox from "./lox";
    import { debounce } from "lodash";
    import { onMount } from "svelte";

    let editor: Editor;
    let editorResize = debounce(() => editor.resize(), 150);
    let ready = false;
    let disassembly: string = "";
    let disassemblyShown = false;
    let output = "";
    onMount(() => {
        lox.init().then(() => (ready = true));
        let interval: number = setInterval(updateDisassembly, 250);
        window.addEventListener("resize", editorResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", editorResize);
        };
    });

    function run() {
        if (!ready) return;
        output = lox.interpret(editor.getValue());
    }
    function updateDisassembly() {
        if (ready && disassemblyShown) {
            disassembly = lox.disassemble(editor.getValue());
        }
    }
    function showDisassembly() {
        disassemblyShown = true;
        setTimeout(editorResize, 0);
    }
    function hideDisassembly() {
        disassemblyShown = false;
        setTimeout(editorResize, 0);
    }
</script>

{#if ready}
    <div class="toolbar">
        <button on:click={run}>Run</button>
        <button hidden={disassemblyShown} on:click={showDisassembly}
            >Show Disassembly</button
        >
        <button hidden={!disassemblyShown} on:click={hideDisassembly}
            >Hide Disassembly</button
        >
    </div>
    <div class="code-container">
        <div class="code" class:full={!disassemblyShown}>
            <Editor bind:this={editor} />
        </div>
        <textarea
            class="disassembly"
            hidden={!disassemblyShown}
            bind:value={disassembly}
            disabled
        />
    </div>
    <textarea class="console" bind:value={output} disabled />
{:else}
    <div class="window-center">
        <Loader />
    </div>
{/if}

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
    }

    .window-center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .code-container {
        height: 50%;
        width: 100%;
        display: flex;
    }
    .code {
        height: 100%;
        width: 50%;
    }
    .code.full {
        width: 100%;
    }
    .disassembly {
        height: 100%;
        width: 50%;
        resize: none;
    }

    .console {
        height: 20%;
        width: 100%;
        resize: none;
    }
</style>
