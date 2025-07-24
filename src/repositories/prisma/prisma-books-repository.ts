import { Prisma, Book } from '@prisma/client'
import { BooksRepository } from '../books-repository'
import { prisma } from '@/lib/prisma'
import { any } from 'zod'

export class PrismaBooksRepository implements BooksRepository {
	items: Book[] = []

	async create(data: Prisma.BookCreateInput): Promise<Book> {
		const book = await prisma.book.create({
			data: {
				title: data.title,
				description: data.description
			}
		})

		return book
	}

	async save(book: Book): Promise<Book> {
		const savedBook = await prisma.book.update({
			where: {
				id: book.id
			},
			data: book
		})

		return savedBook
	}

	async remove(id: string): Promise<void> {
		await prisma.book.delete({
			where: {
				id
			}
		})
	}

	async findById(data: string): Promise<Book | null> {
		const book = await prisma.book.findUnique({
			where: {
				id: data
			}
		})

		return book
	}

	async findByTittle(title: string): Promise<Book | null> {
		const book = await prisma.book.findFirst({
			where: {
				title
			}
		})

		return book
	}

	async findByUserId(id: string): Promise<Book[]> {
		const books = await prisma.book.findMany({
			where: {
				user_id: id
			}
		})

		return books
	}
	async findMany(
		query?: string,
		page = 1,
		availableOnly?: boolean
	): Promise<Book[]> {
		const books = await prisma.book.findMany({
			where: {
				title: {
					contains: query
				},
				user_id: availableOnly ? null : undefined
			},
			take: 20,
			skip: (page - 1) * 20
		})

		return books
	}
}
