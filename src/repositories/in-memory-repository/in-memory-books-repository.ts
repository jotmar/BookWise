import { Prisma, Book } from '@prisma/client'
import { BooksRepository } from '../books-repository'
import { randomUUID } from 'crypto'

export class InMemoryBooksRepository implements BooksRepository {
	public items: Book[] = []
	async create(data: Prisma.BookCreateInput): Promise<Book> {
		const book: Book = {
			id: randomUUID(),
			title: data.title,
			description: data.description,
			borrowed_at: null,
			user_id: null
		}

		this.items.push(book)

		return book
	}
	async findById(id: string): Promise<Book | null> {
		const book = this.items.find(item => item.id === id)

		if (!book) {
			return null
		}

		return book
	}
	async findMany(query: string, page = 1): Promise<Book[]> {
		const books = this.items
			.filter(item => item.title.includes(query))
			.slice((page - 1) * 20, page * 20)

		return books
	}
}
