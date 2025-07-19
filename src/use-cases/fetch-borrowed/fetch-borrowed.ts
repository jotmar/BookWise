import { BooksRepository } from '@/repositories/books-repository'
import { Book } from '@prisma/client'

interface FetchBorrowedUseCaseRequest {
	userId: string
}

interface FetchBorrowedUseCaseResponse {
	books: Book[]
}

export class FetchBorrowedUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(
		data: FetchBorrowedUseCaseRequest
	): Promise<FetchBorrowedUseCaseResponse> {
		const books = await this.booksRepository.findByUserId(data.userId)

		return { books }
	}
}
