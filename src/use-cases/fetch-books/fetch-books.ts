import { BooksRepository } from '@/repositories/books-repository'
import { Book } from '@prisma/client'

interface FetchBooksUseCaseRequest {
	query: string
	page?: number
}

interface FetchBooksUseCaseResponse {
	books: Book[]
}

export class FetchBooksUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(
		data: FetchBooksUseCaseRequest
	): Promise<FetchBooksUseCaseResponse> {
		const books = await this.booksRepository.findMany(
			data.query,
			data.page ? data.page : 1
		)

		return { books }
	}
}
