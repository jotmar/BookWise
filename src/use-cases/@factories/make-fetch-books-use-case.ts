import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { FetchBooksUseCase } from '../fetch-books/fetch-books'

export function makeFetchBooksUseCase() {
	const booksRepository = new PrismaBooksRepository()
	const fetchBooksUseCase = new FetchBooksUseCase(booksRepository)

	return fetchBooksUseCase
}
