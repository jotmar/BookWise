import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
	beforeEach(async () => {
		await app.ready()
	})

	afterEach(async () => {
		await app.close()
	})

	it('should be able to register', async () => {
		const response = await request(app.server).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		})

		expect(response.statusCode).toEqual(201)
	})
})
