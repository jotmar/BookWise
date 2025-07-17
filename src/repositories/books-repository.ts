import { Book, Prisma } from '@prisma/client'

export interface BooksRepository {
	items: Book[]
	create(data: Prisma.BookCreateInput): Promise<Book>
	save(book: Book): Promise<Book>
	remove(id: string): Promise<void>
	findById(data: string): Promise<Book | null>
	findByTittle(title: string): Promise<Book | null>
	findMany(
		query?: string,
		page?: number,
		availableOnly?: boolean
	): Promise<Book[]>
}
