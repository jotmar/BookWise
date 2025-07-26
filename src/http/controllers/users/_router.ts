import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRouter(app: FastifyInstance) {
	/* Register Route */
	/*  */
	app.post('/users', register)

	/* Auth Route */
	/*  */

	app.post('/session', authenticate)

	/* Refresh Token */
	/*  */

	app.patch('/token/refresh', { onRequest: [verifyJwt] }, refresh)
}
