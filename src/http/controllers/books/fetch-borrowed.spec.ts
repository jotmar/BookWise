import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { registerAndAuthenticate } from '@/utils/test/register-authenticate'

describe('Fetch Borrowed (e2e)', () => {
	beforeEach(async () => {
		await app.ready()
	})

	afterEach(async () => {
		await app.close()
	})

	it('should be possible to fetch borrowed books', async () => {
		const { token } = await registerAndAuthenticate()
		const booksId = []

		let createBookResponse = await request(app.server)
			.post('/books')
			.send({
				title: 'A brand new book',
				description: 'Lorem Ipsum'
			})
			.set('Authorization', `Bearer ${token}`)

		booksId.push(createBookResponse.body.book.id)

		createBookResponse = await request(app.server)
			.post('/books')
			.send({
				title: 'A brand old book',
				description: 'Lorem Ipsum'
			})
			.set('Authorization', `Bearer ${token}`)

		booksId.push(createBookResponse.body.book.id)

		await request(app.server)
			.post('/books/borrow')
			.send({
				booksId
			})
			.set('Authorization', `Bearer ${token}`)

		const response = await request(app.server)
			.get('/books/borrowed')
			.send()
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(200)
	})
})
