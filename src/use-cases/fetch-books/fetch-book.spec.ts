import { BooksRepository } from '@/repositories/books-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchBooksUseCase } from './fetch-books'
import { InMemoryBooksRepository } from '@/repositories/in-memory-repository/in-memory-books-repository'

describe('Fetch Books UseCase', () => {
	let booksRepository: BooksRepository
	let sut: FetchBooksUseCase

	beforeEach(() => {
		booksRepository = new InMemoryBooksRepository()
		sut = new FetchBooksUseCase(booksRepository)
	})

	it('should be able to fetch books', async () => {
		for (let i = 1; i <= 21; i++) {
			await booksRepository.create({
				title: 'JavaScript History',
				description: 'A random desc'
			})
		}
		await booksRepository.create({
			title: 'TypeScript History',
			description: 'A random desc'
		})

		const { books } = await sut.use('', 2)
		expect(books).toHaveLength(2)
		expect(books[1].title).toEqual('TypeScript History')
	})

	it('should be possible to fetch only searched books', async () => {
		await booksRepository.create({
			title: 'TypeScript History',
			description: 'A random desc'
		})

		for (let i = 1; i <= 6; i++) {
			await booksRepository.create({
				title: 'JavaScriptHistory',
				description: 'A random desc'
			})
		}

		await booksRepository.create({
			title: 'TypeScript History',
			description: 'A random desc'
		})

		const { books } = await sut.use('Type')

		expect(books).toHaveLength(2)
		expect(books).toEqual([
			expect.objectContaining({ title: 'TypeScript History' }),
			expect.objectContaining({ title: 'TypeScript History' })
		])
	})
})
