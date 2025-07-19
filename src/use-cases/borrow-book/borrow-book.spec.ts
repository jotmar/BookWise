import { describe, it, expect, beforeEach } from 'vitest'
import { BorrowBookUseCase } from './borrow-book'
import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory-repository/in-memory-books-repository'
import { ReturnBorrowedBooksError } from '../@errors/return-borrowed-books-error'
import { AlreadyBorrowedError } from '../@errors/already-borrowed-error'
import { string } from 'zod'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { BorrowLimitError } from '../@errors/borrow-limit-error'

describe('Borrow Book UseCase', () => {
	let sut: BorrowBookUseCase
	let booksRepository: BooksRepository

	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository()
		sut = new BorrowBookUseCase(booksRepository)
	})

	const [title, description] = ['A brand new book', 'Lorem Ipsum']

	it('should be possible to borrow books', async () => {
		const booksId = []

		for (let i = 1; i <= 3; i++) {
			const book = await booksRepository.create({
				title,
				description
			})

			booksId.push(book.id)
		}

		const { books } = await sut.use({
			userId: 'user-01',
			booksId
		})

		expect(books).toHaveLength(3)
		expect(books).toEqual([
			expect.objectContaining({ user_id: 'user-01' }),
			expect.objectContaining({ user_id: 'user-01' }),
			expect.objectContaining({ user_id: 'user-01' })
		])
	})

	it('should not be possible to borrow books before returning borrowed books.', async () => {
		const book = await booksRepository.create({
			title,
			description
		})

		const book2 = await booksRepository.create({
			title,
			description
		})

		await sut.use({
			userId: 'user-01',
			booksId: [book.id]
		})

		await expect(async () => {
			await sut.use({
				userId: 'user-01',
				booksId: [book2.id]
			})
		}).rejects.toBeInstanceOf(ReturnBorrowedBooksError)
	})

	it('should not be possible to borrow an already borrowed book', async () => {
		const book = await booksRepository.create({
			title,
			description
		})

		await sut.use({
			userId: 'user-01',
			booksId: [book.id]
		})

		await expect(async () => {
			await sut.use({
				userId: 'user-02',
				booksId: [book.id]
			})
		}).rejects.toBeInstanceOf(AlreadyBorrowedError)
	})

	it('should not be possible to borrow an inexistent book', async () => {
		await expect(async () => {
			await sut.use({
				userId: 'user-01',
				booksId: ['inexistent-id']
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it('should not be possible to borrow more than 3 books', async () => {
		const booksId: string[] = []

		for (let i = 0; i <= 3; i++) {
			const book = await booksRepository.create({
				title,
				description
			})

			booksId.push(book.id)
		}

		await expect(async () => {
			await sut.use({
				userId: 'user-01',
				booksId
			})
		}).rejects.toBeInstanceOf(BorrowLimitError)
	})
})
