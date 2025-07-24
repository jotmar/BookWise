import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { FetchBorrowedUseCase } from '../fetch-borrowed/fetch-borrowed'

export function makeFetchBorrowedUseCase() {
	const booksRepository = new PrismaBooksRepository()
	const fetchBorrowedUseCase = new FetchBorrowedUseCase(booksRepository)

	return fetchBorrowedUseCase
}
