import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env/setup'
import { ZodError } from 'zod'
import { usersRouter } from './http/controllers/users/_router'

export const app = fastify()

app.setErrorHandler(async (error, request, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation Error', error: error.format() })
	}

	return reply.status(500).send({ message: 'Internal Server Error.' })
})

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.register(fastifyCookie)

app.register(usersRouter)
