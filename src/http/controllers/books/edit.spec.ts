import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { registerAndAuthenticate } from '@/utils/test/register-authenticate'

describe('Register (e2e)', () => {
	beforeEach(async () => {
		await app.ready()
	})

	afterEach(async () => {
		await app.close()
	})

	it('should be possible to edit a book', async () => {
		const { token } = await registerAndAuthenticate()
		const createBookResponse = await request(app.server)
			.post('/books')
			.send({
				title: 'A brand new book',
				description: 'Lorem Ipsum'
			})
			.set('Authorization', `Bearer ${token}`)

		const { id } = createBookResponse.body.book

		const response = await request(app.server)
			.put(`/books/${id}`)
			.send({
				title: 'A brand new updated book',
				description: 'Lorem Ipsum Dolor Sit Amet'
			})
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(204)
	})
})
