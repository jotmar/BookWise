import { describe, it, expect, beforeEach } from 'vitest'
import { EditBookUseCase } from './edit-book'
import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory-repository/in-memory-books-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

describe('Edit Book UseCase', () => {
	let sut: EditBookUseCase
	let booksRepository: BooksRepository

	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository()
		sut = new EditBookUseCase(booksRepository)
	})

	const [title, description] = ['A brand new book', 'Lorem Ipsum']

	it('should be possible to edit a book', async () => {
		const createdBook = await booksRepository.create({
			title,
			description
		})

		await sut.use({
			id: createdBook.id,
			data: {
				title: 'An edited Book',
				description: 'Dolor Sit Amet'
			}
		})

		const book = await booksRepository.findById(createdBook.id)

		if (!book) {
			throw new Error()
		}

		expect(book.title).toEqual('An edited Book')
		expect(book.description).toEqual('Dolor Sit Amet')
	})

	it('should not be able to edit an inexistent book.', async () => {
		await expect(async () => {
			await sut.use({
				id: 'Inexistent-ID',
				data: {
					title: 'Inexistent Book'
				}
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
