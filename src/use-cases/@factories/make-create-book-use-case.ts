import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { CreateBookUseCase } from '../create-book/create-book'

export function makeCreateBookUseCase() {
	const booksRepository = new PrismaBooksRepository()
	const createBookUseCase = new CreateBookUseCase(booksRepository)

	return createBookUseCase
}
