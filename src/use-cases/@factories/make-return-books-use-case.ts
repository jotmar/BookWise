import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { ReturnBooksUseCase } from '../return-books/return-books'

export function makeReturnBooksUseCase() {
	const booksRepository = new PrismaBooksRepository()
	const returnBooksUseCase = new ReturnBooksUseCase(booksRepository)

	return returnBooksUseCase
}
