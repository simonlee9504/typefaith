<script lang="ts">
	let { character, correct } = $props();

	let boxElement: HTMLDivElement | undefined;
	export function getElement() {
		return boxElement;
	}
</script>

<div class="inline-flex items-center" bind:this={boxElement}>
	<span class="text-3xl {correct ? '' : 'text-slate-400'} m-0 p-0">
		{character}
	</span>
</div>
