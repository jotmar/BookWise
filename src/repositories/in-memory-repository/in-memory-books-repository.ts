import { Prisma, Book } from '@prisma/client'
import { BooksRepository } from '../books-repository'
import { randomUUID } from 'crypto'

export class InMemoryBooksRepository implements BooksRepository {
	public items: Book[] = []
	async create(data: Prisma.BookUncheckedCreateInput): Promise<Book> {
		const book: Book = {
			id: randomUUID(),
			title: data.title,
			description: data.description,
			borrowed_at: data.borrowed_at ? new Date(data.borrowed_at) : null,
			user_id: data.user_id ? data.user_id : null
		}

		this.items.push(book)

		return book
	}

	async save(book: Book): Promise<Book> {
		const index = this.items.findIndex(item => item.id === book.id)
		this.items[index] = book
		return book
	}

	async remove(id: string) {
		const bookIndex = this.items.findIndex(item => item.id === id)
		this.items.splice(bookIndex, 1)
	}

	async findById(id: string): Promise<Book | null> {
		const book = this.items.find(item => item.id === id)

		if (!book) {
			return null
		}

		return book
	}
	async findMany(
		query?: string,
		page = 1,
		availableOnly = false
	): Promise<Book[]> {
		const books = this.items
			.filter(item => (query ? item.title.includes(query) : true))
			.filter(item =>
				availableOnly === true ? item.borrowed_at === null : true
			)
			.slice((page - 1) * 20, page * 20)

		return books
	}

	async findByTittle(title: string): Promise<Book | null> {
		const book = this.items.find(item => item.title === title)

		if (!book) {
			return null
		}

		return book
	}

	async findByUserId(id: string): Promise<Book[]> {
		const books = this.items.filter(item => item.user_id === id)

		return books
	}
}
