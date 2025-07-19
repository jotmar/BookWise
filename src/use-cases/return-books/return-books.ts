import { BooksRepository } from '@/repositories/books-repository'
import { Book } from '@prisma/client'

interface ReturnBooksUseCaseRequest {
	userId: string
}

interface ReturnBooksUseCaseResponse {
	books: Book[]
}

export class ReturnBooksUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(
		data: ReturnBooksUseCaseRequest
	): Promise<ReturnBooksUseCaseResponse> {
		const books = await this.booksRepository.findByUserId(data.userId)

		for (let book of books) {
			book.user_id = null
			book.borrowed_at = null

			await this.booksRepository.save(book)
		}

		return { books }
	}
}
