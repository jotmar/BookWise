import { AlreadyBorrowedError } from '@/use-cases/@errors/already-borrowed-error'
import { BorrowLimitError } from '@/use-cases/@errors/borrow-limit-error'
import { ResourceNotFoundError } from '@/use-cases/@errors/resource-not-found-error'
import { ReturnBorrowedBooksError } from '@/use-cases/@errors/return-borrowed-books-error'
import { makeBorrowBookUseCase } from '@/use-cases/@factories/make-borrow-book-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function borrow(request: FastifyRequest, reply: FastifyReply) {
	const requestBodySchema = z.object({
		booksId: z.array(z.string())
	})

	const { booksId } = requestBodySchema.parse(request.body)

	try {
		const borrowBookUseCase = makeBorrowBookUseCase()
		await borrowBookUseCase.use({
			userId: request.user.sub,
			booksId
		})

		return reply.status(200).send()
	} catch (error) {
		if (error instanceof BorrowLimitError) {
			return reply.status(400).send({ message: error.message })
		}
		if (error instanceof ReturnBorrowedBooksError) {
			return reply.status(409).send({ message: error.message })
		}
		if (error instanceof AlreadyBorrowedError) {
			return reply.status(409).send({ message: error.message })
		}
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
