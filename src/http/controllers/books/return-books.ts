import { makeReturnBooksUseCase } from '@/use-cases/@factories/make-return-books-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function returnBorrowed(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const returnBooksUseCase = makeReturnBooksUseCase()

		await returnBooksUseCase.use({
			userId: request.user.sub
		})

		return reply.status(200).send()
	} catch (error) {
		throw error
	}
}
