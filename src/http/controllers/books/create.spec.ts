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

	it('should be possible to create a book', async () => {
		const { token } = await registerAndAuthenticate()
		const response = await request(app.server)
			.post('/books')
			.send({
				title: 'A brand new book',
				description: 'Lorem Ipsum'
			})
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(201)
		expect(response.body.book).toEqual(
			expect.objectContaining({ id: expect.any(String) })
		)
	})
})
