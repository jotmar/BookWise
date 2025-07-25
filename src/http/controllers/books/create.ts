import { DuplicatedBookError } from '@/use-cases/@errors/duplicated-book-error'
import { makeCreateBookUseCase } from '@/use-cases/@factories/make-create-book-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const requestBodySchema = z.object({
		title: z.string(),
		description: z.string()
	})

	const { title, description } = requestBodySchema.parse(request.body)

	try {
		const createBookUseCase = makeCreateBookUseCase()

		const { book } = await createBookUseCase.use({
			title,
			description
		})

		return reply.status(201).send({ book })
	} catch (error) {
		if (error instanceof DuplicatedBookError) {
			return reply.status(409).send({ message: error.message })
		}

		throw error
	}
}
