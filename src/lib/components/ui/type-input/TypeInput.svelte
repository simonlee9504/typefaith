<script lang="ts">
	import Button from '../button/button.svelte';
	import Caret from './Caret.svelte';
	import Character from './Character.svelte';
	import { TypeState } from './TypeState.svelte';

	let showCaret = $state(false);
	const typeState = new TypeState('Hello there!');
	$inspect(typeState.wordMatrix);

	const typingIndex = $state({
		wordIdx: 0,
		charIdx: 0
	});
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === ' ') {
			typingIndex.wordIdx++;
			typingIndex.charIdx = 0;
		} else {
			typingIndex.charIdx++;
		}
	};

	const characterRefs = $state<(Character | null)[][]>(
		typeState.wordMatrix.map((word) => word.characters.map(() => null))
	);
	$inspect(characterRefs);

	const activeCharacterRef = $derived(characterRefs[typingIndex.wordIdx][typingIndex.charIdx]);
	const caretPos: [number, number] = $derived([
		activeCharacterRef?.getElement()?.getBoundingClientRect().left ?? -1000,
		activeCharacterRef?.getElement()?.getBoundingClientRect().top ?? -1000
	]);
	$inspect(caretPos);
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4">
	<div
		class="flex focus-visible:outline-none"
		role="textbox"
		tabindex="0"
		onkeydown={handleKeyDown}
		onfocus={() => (showCaret = true)}
		onblur={() => (showCaret = false)}
	>
		{#each typeState.wordMatrix as word, wordIdx (word.idx)}
			{#if wordIdx !== 0}
				<div class="h-2 w-2"></div>
			{/if}
			{#each word.characters as character, charIdx (character.idx)}
				<Character
					character={character.character}
					correct={character.correct}
					bind:this={characterRefs[wordIdx][charIdx]}
				/>
			{/each}
		{/each}
		<Caret visible={showCaret && !!activeCharacterRef} pos={caretPos} />
	</div>
	<Button onclick={() => typeState.reset()}>Reset</Button>
</div>
