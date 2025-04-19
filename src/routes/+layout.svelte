<script lang="ts">
	import '../app.css';
	import PageWrapper from '$lib/components/ui/page-wrapper/PageWrapper.svelte';

	let { children } = $props();
</script>

<PageWrapper>
	{@render children()}
</PageWrapper>
