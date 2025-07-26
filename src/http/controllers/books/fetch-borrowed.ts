import { makeFetchBorrowedUseCase } from '@/use-cases/@factories/make-fetch-borrowed-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchBorrowed(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const fetchBorrowedUseCase = makeFetchBorrowedUseCase()

		console.log(request.user.sub)
		const { books } = await fetchBorrowedUseCase.use({
			userId: request.user.sub
		})

		return reply.status(200).send({ books })
	} catch (error) {
		throw error
	}
}
