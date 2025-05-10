<script lang="ts">
	let { character, correct, incorrectCharacter } = $props();

	let boxElement: HTMLDivElement | undefined;
	export function getElement() {
		return boxElement;
	}

	const characterColor = $derived(
		correct ? '' : incorrectCharacter ? 'text-red-500' : 'text-slate-400'
	);
</script>

<div class="inline-flex items-center" bind:this={boxElement}>
	<span class="text-3xl {characterColor} m-0 p-0">
		{incorrectCharacter ? incorrectCharacter : character}
	</span>
</div>
