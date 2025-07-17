import { describe, it, expect, beforeEach } from 'vitest'
import { CreateBookUseCase } from './create-book'
import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory-repository/in-memory-books-repository'
import { DuplicatedBookError } from '../@errors/duplicated-book-error'

describe('Create Book UseCase', () => {
	let sut: CreateBookUseCase
	let booksRepository: BooksRepository

	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository()
		sut = new CreateBookUseCase(booksRepository)
	})

	const [title, description] = ['A Brand New Book', 'Lorem Ipsum']

	it('should be able to create a new book', async () => {
		const { book } = await sut.use({
			title,
			description
		})

		expect(book.id).toEqual(expect.any(String))
	})

	it('should not be able to create books with same title', async () => {
		await sut.use({
			title,
			description
		})

		await expect(async () => {
			await sut.use({
				title,
				description
			})
		}).rejects.toBeInstanceOf(DuplicatedBookError)
	})
})
