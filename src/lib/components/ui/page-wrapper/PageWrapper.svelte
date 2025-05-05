<script lang="ts">
	import { page } from '$app/state';
	import Button from '../button/button.svelte';
	import { routes } from '../../../../routes/routes';
	import { Moon, Sun } from '@lucide/svelte';
	import { ModeWatcher, mode, setMode } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher track={true} />
<div class="mx-20 flex min-h-screen flex-col gap-10">
	<nav class="mt-10 flex items-end justify-between">
		<div class="flex items-end gap-2">
			{#each routes as route (route.label)}
				{#if route.header}
					<a href={route.href}>
						<h1 class="font-heading mr-8 text-4xl">
							{route.label}
						</h1>
					</a>
				{:else}
					<Button
						variant="link"
						size="sm"
						href={route.href}
						class="text-lg {page.url.pathname === route.href ? 'underline' : ''}"
					>
						{route.label}
					</Button>
				{/if}
			{/each}
		</div>

		{#if $mode === 'dark'}
			<Sun onclick={() => setMode('light')} class="cursor-pointer" />
		{:else}
			<Moon onclick={() => setMode('dark')} class="cursor-pointer" />
		{/if}
	</nav>

	<main class="flex w-full flex-1">
		{@render children()}
	</main>

	<footer class="mb-10 flex items-center">
		<p class="text-sm text-muted-foreground">
			Made by
			<a href="https://github.com/simonlee9504/typefaith" class="underline">Simon Lee</a>
		</p>
	</footer>
</div>
