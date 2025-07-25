import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { registerAndAuthenticate } from '@/utils/test/register-authenticate'

describe('Fetch (e2e)', () => {
	beforeEach(async () => {
		await app.ready()
	})

	afterEach(async () => {
		await app.close()
	})

	it('should be possible to fetch books', async () => {
		const { token } = await registerAndAuthenticate()

		await request(app.server)
			.post('/books')
			.send({
				title: 'A brand new book',
				description: 'Lorem Ipsum'
			})
			.set('Authorization', `Bearer ${token}`)

		await request(app.server)
			.post('/books')
			.send({
				title: 'A brand old book',
				description: 'Lorem Ipsum'
			})
			.set('Authorization', `Bearer ${token}`)

		const response = await request(app.server)
			.get('/books')
			.send()
			.set('Authorization', `Bearer ${token}`)

		expect(response.body.books).toHaveLength(2)
		expect(response.statusCode).toEqual(200)
	})
})
