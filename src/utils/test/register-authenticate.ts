import request from 'supertest'
import { app } from '@/app'

export async function registerAndAuthenticate() {
	const [name, email, password] = ['John Doe', 'johndoe@example.com', '123456']

	await request(app.server).post('/users').send({
		name,
		email,
		password
	})

	const response = await request(app.server).post('/session').send({
		email,
		password
	})

	const token = response.body.token

	return { token }
}
