import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { registerAndAuthenticate } from '@/utils/test/register-authenticate'

describe('Borrow (e2e)', () => {
	beforeEach(async () => {
		await app.ready()
	})

	afterEach(async () => {
		await app.close()
	})

	it('should be possible to borrow a book', async () => {
		const { token } = await registerAndAuthenticate()
		const booksId = []

		for (let i = 0; i < 3; i++) {
			const response = await request(app.server)
				.post('/books')
				.send({
					title: 'A brand new book' + i,
					description: 'Lorem Ipsum'
				})
				.set('Authorization', `Bearer ${token}`)

			booksId.push(response.body.book.id)
		}

		const response = await request(app.server)
			.post('/books/borrow')
			.send({
				booksId
			})
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(200)
	})
})
