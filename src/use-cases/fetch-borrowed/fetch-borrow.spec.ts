import { describe, it, expect, beforeEach } from 'vitest'
import { FetchBorrowedUseCase } from './fetch-borrowed'
import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory-repository/in-memory-books-repository'
import { BorrowBookUseCase } from '../borrow-book/borrow-book'

describe('Fetch Borrowed UseCase', () => {
	let sut: FetchBorrowedUseCase
	let borrowBook: BorrowBookUseCase
	let booksRepository: BooksRepository

	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository()
		borrowBook = new BorrowBookUseCase(booksRepository)
		sut = new FetchBorrowedUseCase(booksRepository)
	})

	const [title, description] = ['A brand new book', 'Lorem Ipsum']

	it('should be possible to fetch borrowed books.', async () => {
		const booksId = []
		for (let i = 0; i < 3; i++) {
			const book = await booksRepository.create({
				title,
				description
			})

			booksId.push(book.id)
		}

		await borrowBook.use({
			userId: 'user-01',
			booksId
		})

		const { books } = await sut.use({
			userId: 'user-01'
		})

		expect(books).toEqual([
			expect.objectContaining({ user_id: 'user-01' }),
			expect.objectContaining({ user_id: 'user-01' }),
			expect.objectContaining({ user_id: 'user-01' })
		])
	})
})
