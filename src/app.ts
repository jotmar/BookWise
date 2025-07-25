import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env/setup'
import { ZodError } from 'zod'
import { usersRouter } from './http/controllers/users/_router'
import { booksRouter } from './http/controllers/books/_router'

export const app = fastify()

/* Error Handler */
/*  */

app.setErrorHandler(async (error, request, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation Error', error: error.format() })
	}

	return reply.status(500).send({ message: 'Internal Server Error.' })
})

/* JWT */
/*  */

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

/* Cookies */
/*  */
app.register(fastifyCookie)

/* Routes */
/*  */

app.register(usersRouter)
app.register(booksRouter)
