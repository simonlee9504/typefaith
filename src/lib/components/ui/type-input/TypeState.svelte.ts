type WordProps = {
	word: string;
	correct: boolean;
	idx: number;
	characters: CharacterProps[];
};

type CharacterProps = {
	character: string;
	correct: boolean;
	idx: number;
	ref: HTMLDivElement | undefined;
};

export class TypeState {
	verse: string = $state('');
	wordMatrix: WordProps[] = $derived(
		this.verse.split(' ').map((word, idx) => ({
			word,
			correct: false,
			idx,
			characters: word.split('').map((character, idx) => ({
				character,
				correct: false,
				idx,
				ref: undefined
			}))
		}))
	);

	constructor(verse: string) {
		this.verse = verse;
	}

	reset() {
		this.verse = '';
		this.wordMatrix = [];
	}
}
