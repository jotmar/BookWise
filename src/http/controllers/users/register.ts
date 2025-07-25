import { UserAlreadyExistsError } from '@/use-cases/@errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/@factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const requestBodySchema = z.object({
		name: z.string(),
		email: z.email(),
		password: z.string()
	})

	const { name, email, password } = requestBodySchema.parse(request.body)

	try {
		const registerUseCase = makeRegisterUseCase()

		await registerUseCase.use({
			email,
			name,
			password
		})

		return reply.status(201).send()
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({
				message: 'User Already Exists'
			})
		}

		throw error
	}
}
