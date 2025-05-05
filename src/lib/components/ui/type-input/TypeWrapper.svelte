<script lang="ts">
	let { children } = $props();
</script>

<div class="flex w-full flex-1 flex-col items-center justify-center">
	{@render children()}
</div>
