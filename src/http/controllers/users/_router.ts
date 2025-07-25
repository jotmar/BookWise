import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function usersRouter(app: FastifyInstance) {
	/* Register Route */
	/*  */
	app.post('/users', register)

	/* Auth Route */
	/*  */

	app.post('/session', authenticate)
}
