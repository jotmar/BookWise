import { makeRemoveBookUseCase } from '@/use-cases/@factories/make-remove-book-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
	const requestParamSchema = z.object({
		id: z.string()
	})

	const { id } = requestParamSchema.parse(request.params)

	try {
		const removeBookUseCase = makeRemoveBookUseCase()

		await removeBookUseCase.use({
			id
		})

		return reply.status(204).send()
	} catch (error) {
		throw error
	}
}
