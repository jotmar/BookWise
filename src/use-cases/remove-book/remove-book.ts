import { BooksRepository } from '@/repositories/books-repository'

interface RemoveBookUseCaseRequest {
	id: string
}

export class RemoveBookUseCase {
	constructor(private booksRepository: BooksRepository) {}

	async use(data: RemoveBookUseCaseRequest) {
		await this.booksRepository.remove(data.id)
	}
}
