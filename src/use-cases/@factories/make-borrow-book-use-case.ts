import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { BorrowBookUseCase } from '../borrow-book/borrow-book'

export function makeBorrowBookUseCase() {
	const booksRepository = new PrismaBooksRepository()
	const borrowBookUseCase = new BorrowBookUseCase(booksRepository)

	return borrowBookUseCase
}
