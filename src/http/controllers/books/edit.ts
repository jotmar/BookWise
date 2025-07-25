import { DuplicatedBookError } from '@/use-cases/@errors/duplicated-book-error'
import { makeEditBookUseCase } from '@/use-cases/@factories/make-edit-book-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
	const requestBodySchema = z.object({
		title: z.string(),
		description: z.string()
	})

	const requestParamsSchema = z.object({
		id: z.uuid()
	})

	const { title, description } = requestBodySchema.parse(request.body)
	const { id } = requestParamsSchema.parse(request.params)

	try {
		const editBookUseCase = makeEditBookUseCase()

		await editBookUseCase.use({
			id: id,
			data: {
				title,
				description
			}
		})

		return reply.status(204).send()
	} catch (error) {
		if (error instanceof DuplicatedBookError) {
			return reply.status(409).send({ message: error.message })
			/* TO DO: Add this validation to edit book use case */
		}
	}
}
