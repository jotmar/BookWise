import { BooksRepository } from '@/repositories/books-repository'
import { Book } from '@prisma/client'
import { DuplicatedBookError } from '../@errors/duplicated-book-error'

interface CreateBookUseCaseRequest {
	title: string
	description: string
}

interface CreateBookUseCaseResponse {
	book: Book
}

export class CreateBookUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(
		data: CreateBookUseCaseRequest
	): Promise<CreateBookUseCaseResponse> {
		const sameTitleBook = await this.booksRepository.findByTittle(data.title)

		if (sameTitleBook) {
			throw new DuplicatedBookError()
		}

		const book = await this.booksRepository.create({
			title: data.title,
			description: data.description
		})

		return { book }
	}
}
