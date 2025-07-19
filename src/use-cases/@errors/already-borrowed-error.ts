export class AlreadyBorrowedError extends Error {
	constructor() {
		super('This book is already borrowed.')
	}
}
