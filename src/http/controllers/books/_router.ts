import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { edit } from './edit'
import { remove } from './remove'
import { fetchBooks } from './fetch'
import { borrow } from './borrow'
import { fetchBorrowed } from './fetch-borrowed'
import { returnBorrowed } from './return-books'
import { verifyRole } from '@/http/middlewares/verify-role'

export async function booksRouter(app: FastifyInstance) {
	/* Authenticated Only */
	/*  */

	app.addHook('onRequest', verifyJwt)

	app.get('/books', fetchBooks)

	app.get('/books/borrowed', fetchBorrowed)

	app.post('/books/borrow', borrow)

	app.post(
		'/books/borrowed/return',

		returnBorrowed
	)

	/* Admin Only */
	/*  */

	app.addHook('onRequest', verifyRole('ADMIN'))

	app.post('/books', create)

	app.put('/books/:id', edit)

	app.delete('/books/:id', remove)
}
