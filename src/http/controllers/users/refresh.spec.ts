import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { registerAndAuthenticate } from '@/utils/test/register-authenticate'

describe('Refresh (e2e)', () => {
	beforeEach(async () => {
		await app.ready()
	})

	afterEach(async () => {
		await app.close()
	})

	it('should be able to refresh token', async () => {
		const { token } = await registerAndAuthenticate()
		const response = await request(app.server)
			.patch('/token/refresh')
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(200)
	})
})
