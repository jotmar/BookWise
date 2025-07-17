import { Book, Prisma } from '@prisma/client'

export interface BooksRepository {
	items: Book[]
	create(data: Prisma.BookCreateInput): Promise<Book>
	findById(data: string): Promise<Book | null>
	findMany(
		query?: string,
		page?: number,
		availableOnly?: boolean
	): Promise<Book[]>
}
