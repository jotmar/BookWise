import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'
import { EditBookUseCase } from '../edit-book/edit-book'

export function makeEditBookUseCase() {
	const booksRepository = new PrismaBooksRepository()
	const editBookUseCase = new EditBookUseCase(booksRepository)

	return editBookUseCase
}
