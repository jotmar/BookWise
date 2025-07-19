export class BorrowLimitError extends Error {
	constructor() {
		super("You can't borrow more than 3 books.")
	}
}
