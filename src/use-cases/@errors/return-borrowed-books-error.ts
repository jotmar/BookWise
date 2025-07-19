export class ReturnBorrowedBooksError extends Error {
	constructor() {
		super('You must return your borrowed books before borrowing new books.')
	}
}
