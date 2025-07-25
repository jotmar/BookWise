import { makeFetchBooksUseCase } from '@/use-cases/@factories/make-fetch-books-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function fetchBooks(request: FastifyRequest, reply: FastifyReply) {
	const requestQuerySchema = z.object({
		query: z.string().optional(),
		page: z.coerce.number().optional()
	})

	const { query, page } = requestQuerySchema.parse(request.query)

	try {
		const fetchBooksUseCase = makeFetchBooksUseCase()

		const { books } = await fetchBooksUseCase.use(query, page)

		return reply.status(200).send({ books })
	} catch (error) {
		throw error
	}
}
