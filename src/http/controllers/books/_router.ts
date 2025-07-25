import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { edit } from './edit'
import { remove } from './remove'
import { fetchBooks } from './fetch'

export async function booksRouter(app: FastifyInstance) {
	/* Authenticated Only */
	/*  */

	app.get('/books', { preHandler: [verifyJwt] }, fetchBooks)

	/* Admin Only */
	/*  */

	app.post('/books', { preHandler: [verifyJwt] }, create)

	app.put('/books/:id', { preHandler: [verifyJwt] }, edit)

	app.delete('/books/:id', { preHandler: [verifyJwt] }, remove)
}
