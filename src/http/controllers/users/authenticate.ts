import { InvalidCredentialsError } from '@/use-cases/@errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/@factories/make-authenticate-use-case'
import fastifyJwt from '@fastify/jwt'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const requestBodySchema = z.object({
		email: z.email(),
		password: z.string()
	})

	const { email, password } = requestBodySchema.parse(request.body)

	try {
		const authenticateUseCase = makeAuthenticateUseCase()

		const { user } = await authenticateUseCase.use({
			email,
			password
		})

		const token = await reply.jwtSign(
			{
				role: user.role
			},
			{
				sign: {
					sub: user.id
				}
			}
		)

		return reply.status(200).send({ token })
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(401).send({ message: error.message })
		}

		throw error
	}
}
