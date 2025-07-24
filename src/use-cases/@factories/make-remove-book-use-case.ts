import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { RemoveBookUseCase } from '../remove-book/remove-book'

export function makeRemoveBookUseCase() {
	const booksRepository = new PrismaBooksRepository()
	const removeBookUseCase = new RemoveBookUseCase(booksRepository)

	return removeBookUseCase
}
