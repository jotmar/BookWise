import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function booksRouter(app: FastifyInstance) {
	/* Admin Only */
	/*  */

	app.post('/books', { preHandler: [verifyJwt] }, create)
}
