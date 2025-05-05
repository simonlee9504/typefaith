<script lang="ts">
	import { fade } from 'svelte/transition';

	let {
		visible,
		pos,
		width = 2,
		height = 32
	}: { visible: boolean; pos: [number, number]; width?: number; height?: number } = $props();
</script>

{#if visible}
	<div
		class="animate-caretBlink absolute m-0 inline-block rounded bg-black p-0 dark:bg-white"
		style={`left: ${pos[0]}px; top: ${pos[1]}px; width: ${width}px; height: ${height}px`}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 200 }}
	></div>
{/if}
