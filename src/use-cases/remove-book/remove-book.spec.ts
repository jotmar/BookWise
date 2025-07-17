import { describe, it, expect, beforeEach } from 'vitest'
import { RemoveBookUseCase } from './remove-book'
import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory-repository/in-memory-books-repository'
import { hasUncaughtExceptionCaptureCallback } from 'process'

describe('Remove Book UseCase', () => {
	let sut: RemoveBookUseCase
	let booksRepository: BooksRepository

	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository()
		sut = new RemoveBookUseCase(booksRepository)
	})

	const [title, description] = ['A Brand New Book', 'Lorem Ipsum']

	it('should be possible to remove a book', async () => {
		const createdBook = await booksRepository.create({
			title,
			description
		})

		await booksRepository.create({
			title,
			description
		})

		expect(booksRepository.items).toHaveLength(2)

		await sut.use({
			id: createdBook.id
		})

		expect(booksRepository.items).toHaveLength(1)
	})
})
