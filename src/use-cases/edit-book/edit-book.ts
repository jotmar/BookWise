import { BooksRepository } from '@/repositories/books-repository'
import { Book } from '@prisma/client'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

interface EditBookUseCaseRequest {
	id: string
	data: {
		title?: string
		description?: string
	}
}

interface EditBookUseCaseResponse {
	book: Book
}

export class EditBookUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(data: EditBookUseCaseRequest): Promise<EditBookUseCaseResponse> {
		const { title, description } = data.data
		const book = await this.booksRepository.findById(data.id)

		if (!book) {
			throw new ResourceNotFoundError()
		}

		book.title = title ? title : book.title
		book.description = description ? description : book.description

		await this.booksRepository.save(book)

		return { book }
	}
}
