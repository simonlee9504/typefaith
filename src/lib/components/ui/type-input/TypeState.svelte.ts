import { generateUUID } from '$lib/utils';
import type Character from './Character.svelte';
import { generateCharacterId, generateWordId } from './utils';

type WordProps = {
	id: string; // unique for each dom element
	word: string;
	correct: boolean;
	characters: CharacterProps[];
};

export type CharacterProps = {
	id: string; // unique for each dom element
	character: string;
	correct: boolean;
	ref: Character | undefined;
	incorrectCharacter: string | null;
	originalCharacter: string | null;
};

const ESCAPED_KEYS = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Enter', 'Escape'];

export class TypeState {
	id: string = generateUUID();
	verse: string = '';
	wordMatrix: WordProps[] = $state([]);
	typingIndex: { wordIdx: number; charIdx: number } = $state({ wordIdx: -1, charIdx: -1 });
	characterRefs: (Character | null)[][] = $state([]);
	activeCharacterRef = $derived(
		this.validTypingIndex()
			? this.characterRefs[this.typingIndex.wordIdx][this.typingIndex.charIdx]
			: null
	);
	prevActiveCharacterRef = $derived(
		this.validTypingIndex() && this.typingIndex.charIdx > 0
			? this.characterRefs[this.typingIndex.wordIdx][this.typingIndex.charIdx - 1]
			: null
	);
	isActiveLastCharInWord = $derived(
		this.wordMatrix.length > 0 &&
			this.typingIndex.charIdx === this.wordMatrix[this.typingIndex.wordIdx].characters.length
	);
	caretPos: [number, number] = $derived([
		(this.isActiveLastCharInWord
			? this.prevActiveCharacterRef?.getElement()?.getBoundingClientRect().right
			: this.activeCharacterRef?.getElement()?.getBoundingClientRect().left) ?? -1000,
		(this.isActiveLastCharInWord
			? this.prevActiveCharacterRef?.getElement()?.getBoundingClientRect().top
			: this.activeCharacterRef?.getElement()?.getBoundingClientRect().top) ?? -1000
	]);

	constructor(verse: string) {
		this.init(verse);
	}

	init(verse: string) {
		this.id = generateUUID();
		this.verse = verse;
		this.wordMatrix = [];
		this.characterRefs = [];
		this.initWordMatrix();
		this.initCharacterRefs();
	}

	initWordMatrix() {
		this.wordMatrix = this.verse.split(' ').map((word, wordIdx) => ({
			id: generateWordId(this.id, wordIdx),
			word,
			correct: false,
			characters: word.split('').map((character, charIdx) => ({
				id: generateCharacterId(this.id, wordIdx, charIdx),
				character,
				correct: false,
				ref: undefined,
				incorrectCharacter: null,
				originalCharacter: character
			}))
		}));
		if (this.wordMatrix.length > 0) {
			this.typingIndex.wordIdx = 0;
			this.typingIndex.charIdx = 0;
		}
	}

	initCharacterRefs() {
		this.characterRefs = this.wordMatrix.map((word) => word.characters.map(() => null));
	}

	validTypingIndex() {
		return (
			this.typingIndex.wordIdx < this.wordMatrix.length &&
			this.typingIndex.wordIdx !== -1 &&
			this.typingIndex.charIdx <= this.wordMatrix[this.typingIndex.wordIdx].characters.length &&
			this.typingIndex.charIdx !== -1
		);
	}

	handleCorrectness(key: string) {
		if (
			key ===
			this.wordMatrix[this.typingIndex.wordIdx].characters[this.typingIndex.charIdx].character
		) {
			this.wordMatrix[this.typingIndex.wordIdx].characters[this.typingIndex.charIdx].correct = true;
		} else {
			this.wordMatrix[this.typingIndex.wordIdx].characters[this.typingIndex.charIdx].correct =
				false;
			this.wordMatrix[this.typingIndex.wordIdx].characters[
				this.typingIndex.charIdx
			].incorrectCharacter = key;
		}
	}

	advanceWord() {
		this.typingIndex.wordIdx++;
		this.typingIndex.charIdx = 0;
		if (this.typingIndex.wordIdx >= this.wordMatrix.length) {
			this.finish();
		}
	}

	advanceCharacter(key: string) {
		if (this.typingIndex.charIdx < this.wordMatrix[this.typingIndex.wordIdx].characters.length) {
			this.handleCorrectness(key);
			this.typingIndex.charIdx++;
		} else {
			this.wordMatrix[this.typingIndex.wordIdx].characters.push({
				id: generateCharacterId(this.id, this.typingIndex.wordIdx, this.typingIndex.charIdx + 1),
				character: key,
				correct: false,
				ref: undefined,
				incorrectCharacter: key,
				originalCharacter: null
			});
			this.typingIndex.charIdx++;
		}
	}

	backspaceCharacter() {
		if (this.typingIndex.charIdx > 0) {
			this.typingIndex.charIdx--;
			if (
				this.wordMatrix[this.typingIndex.wordIdx].characters[this.typingIndex.charIdx]
					.originalCharacter === null
			) {
				this.wordMatrix[this.typingIndex.wordIdx].characters.pop();
			} else {
				this.wordMatrix[this.typingIndex.wordIdx].characters[this.typingIndex.charIdx].correct =
					false;
				this.wordMatrix[this.typingIndex.wordIdx].characters[
					this.typingIndex.charIdx
				].incorrectCharacter = null;
			}
		} else if (this.typingIndex.wordIdx > 0) {
			this.typingIndex.wordIdx--;
			this.typingIndex.charIdx = this.wordMatrix[this.typingIndex.wordIdx].characters.length;
		}
	}

	handleKeyDown(e: KeyboardEvent) {
		if (e.key === ' ') {
			this.advanceWord();
		} else if (e.key === 'Backspace') {
			this.backspaceCharacter();
		} else if (!ESCAPED_KEYS.includes(e.key)) {
			this.advanceCharacter(e.key);
		}
	}

	reset() {
		this.init('The lazy dog jumped over the quick brown fox');
	}

	finish() {
		alert('finished');
		this.reset();
	}
}
