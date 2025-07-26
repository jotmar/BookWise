import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { edit } from './edit'
import { remove } from './remove'
import { fetchBooks } from './fetch'
import { borrow } from './borrow'
import { fetchBorrowed } from './fetch-borrowed'

export async function booksRouter(app: FastifyInstance) {
	/* Authenticated Only */
	/*  */

	app.get('/books', { preHandler: [verifyJwt] }, fetchBooks)

	app.get('/books/borrowed', { preHandler: [verifyJwt] }, fetchBorrowed)

	app.post('/books/borrow', { preHandler: [verifyJwt] }, borrow)

	/* Admin Only */
	/*  */

	app.post('/books', { preHandler: [verifyJwt] }, create)

	app.put('/books/:id', { preHandler: [verifyJwt] }, edit)

	app.delete('/books/:id', { preHandler: [verifyJwt] }, remove)
}
