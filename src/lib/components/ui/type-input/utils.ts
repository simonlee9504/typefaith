export function generateWordId(typeStateId: string, wordIdx: number) {
	return `${typeStateId}-${wordIdx}`;
}

export function generateCharacterId(typeStateId: string, wordIdx: number, charIdx: number) {
	return `${typeStateId}-${wordIdx}-${charIdx}`;
}
