<script lang="ts">
	import Button from '../button/button.svelte';
	import Caret from './Caret.svelte';
	import Character from './Character.svelte';
	import { TypeState } from './TypeState.svelte';

	let showCaret = $state(false);
	const typeState = new TypeState('Hello there!');
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4">
	<div
		class="flex focus-visible:outline-none"
		role="textbox"
		tabindex="0"
		onkeydown={(e) => typeState.handleKeyDown(e)}
		onfocus={() => (showCaret = true)}
		onblur={() => (showCaret = false)}
	>
		{#if typeState.wordMatrix.length > 0}
			{#each typeState.wordMatrix as word, wordIdx (word.id)}
				{#if wordIdx !== 0}
					<div class="h-2 w-2"></div>
				{/if}
				{#each word.characters as character, charIdx (character.id)}
					<Character
						character={character.character}
						correct={character.correct}
						incorrectCharacter={character.incorrectCharacter}
						bind:this={typeState.characterRefs[wordIdx][charIdx]}
					/>
				{/each}
			{/each}
		{/if}
		<Caret
			visible={showCaret && (!!typeState.activeCharacterRef || !!typeState.prevActiveCharacterRef)}
			pos={typeState.caretPos}
		/>
	</div>
	<Button onclick={() => typeState.reset()}>Reset</Button>
</div>
