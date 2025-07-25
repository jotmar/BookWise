import { BooksRepository } from '@/repositories/books-repository'
import { ResourceNotFoundError } from '../@errors/resource-not-found-error'

interface RemoveBookUseCaseRequest {
	id: string
}

export class RemoveBookUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(data: RemoveBookUseCaseRequest) {
		const checkBook = await this.booksRepository.findById(data.id)

		if (!checkBook) {
			throw new ResourceNotFoundError()
		}

		await this.booksRepository.remove(data.id)
	}
}
