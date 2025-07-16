import { BooksRepository } from '@/repositories/books-repository'
import { Book } from '@prisma/client'

interface FetchBooksUseCaseRequest {
	query?: string
	page?: number
}

interface FetchBooksUseCaseResponse {
	books: Book[]
}

export class FetchBooksUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(query?: string, page?: number): Promise<FetchBooksUseCaseResponse> {
		const books = await this.booksRepository.findMany(query, page)

		return { books }
	}
}
