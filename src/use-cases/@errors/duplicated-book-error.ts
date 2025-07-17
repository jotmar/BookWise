export class DuplicatedBookError extends Error {
	constructor() {
		super('A Book with this title already exists.')
	}
}
