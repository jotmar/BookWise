import { describe, it, expect, beforeEach } from 'vitest'
import { ReturnBooksUseCase } from './return-books'
import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory-repository/in-memory-books-repository'
import { BorrowBookUseCase } from '../borrow-book/borrow-book'
import { object } from 'zod'

describe('Return Books UseCase', () => {
	let sut: ReturnBooksUseCase
	let booksRepository: BooksRepository
	let borrowBooks: BorrowBookUseCase

	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository()
		borrowBooks = new BorrowBookUseCase(booksRepository)
		sut = new ReturnBooksUseCase(booksRepository)
	})

	const [title, description] = ['A brand new book', 'Lorem Ipsum']

	it('should be possible to return borrowed books', async () => {
		const booksId = []

		for (let i = 0; i <= 2; i++) {
			const book = await booksRepository.create({
				title,
				description
			})

			booksId.push(book.id)
		}

		await borrowBooks.use({
			userId: 'user-01',
			booksId: booksId
		})

		const { books } = await sut.use({
			userId: 'user-01'
		})

		const isolatedBook = await booksRepository.findById(books[0].id)

		expect(isolatedBook?.user_id).toEqual(null)

		expect(books).toEqual([
			expect.objectContaining({ user_id: null }),
			expect.objectContaining({ user_id: null }),
			expect.objectContaining({ user_id: null })
		])
	})
})
