import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { edit } from './edit'
import { remove } from './remove'
import { fetchBooks } from './fetch'
import { borrow } from './borrow'
import { fetchBorrowed } from './fetch-borrowed'
import { returnBorrowed } from './return-books'

export async function booksRouter(app: FastifyInstance) {
	/* Authenticated Only */
	/*  */

	app.get('/books', { preHandler: [verifyJwt] }, fetchBooks)

	app.get('/books/borrowed', { preHandler: [verifyJwt] }, fetchBorrowed)

	app.post('/books/borrow', { preHandler: [verifyJwt] }, borrow)

	app.post(
		'/books/borrowed/return',
		{ preHandler: [verifyJwt] },
		returnBorrowed
	)

	/* Admin Only */
	/*  */

	app.post('/books', { preHandler: [verifyJwt] }, create)

	app.put('/books/:id', { preHandler: [verifyJwt] }, edit)

	app.delete('/books/:id', { preHandler: [verifyJwt] }, remove)
}
