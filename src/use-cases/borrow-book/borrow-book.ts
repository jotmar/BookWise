import { BooksRepository } from '@/repositories/books-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Book } from '@prisma/client'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'
import { ReturnBorrowedBooksError } from '../@errors/return-borrowed-books-error'
import { AlreadyBorrowedError } from '../@errors/already-borrowed-error'
import { BorrowLimitError } from '../@errors/borrow-limit-error'

interface BorrowBookUseCaseRequest {
	userId: string
	booksId: string[]
}

interface BorrowBookUseCaseResponse {
	books: Book[]
}

export class BorrowBookUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(
		data: BorrowBookUseCaseRequest
	): Promise<BorrowBookUseCaseResponse> {
		const books = []

		if (data.booksId.length > 3) {
			throw new BorrowLimitError()
		}

		const checkIfUserHasBorrowedBooks = await this.booksRepository.findByUserId(
			data.userId
		)

		if (checkIfUserHasBorrowedBooks.length !== 0) {
			throw new ReturnBorrowedBooksError()
		}

		for (let i = 0; i < data.booksId.length; i++) {
			const book = await this.booksRepository.findById(data.booksId[i])
			if (!book) {
				throw new ResourceNotFoundError()
			}

			if (book.borrowed_at || book.user_id) {
				throw new AlreadyBorrowedError()
			}

			book.borrowed_at = new Date()
			book.user_id = data.userId

			this.booksRepository.save(book)

			books.push(book)
		}

		return { books }
	}
}
