import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { UsersRepository } from '@/repositories/users-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../@errors/invalid-credentials-error'

describe('Authenticate Use Case', async () => {
	let usersRepository: UsersRepository
	let sut: AuthenticateUseCase

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository)
	})

	const [name, email, password] = ['John Doe', 'johndoe@example.com', '123456']
	const password_hash = await hash(password, 6)

	it('should be possible to authenticate', async () => {
		await usersRepository.create({
			name,
			email,
			password_hash
		})

		const { user } = await sut.use({
			email,
			password
		})

		expect(user.email).toEqual(email)
	})

	it('should not be possible to authenticate with inexistent email', async () => {
		await expect(async () => {
			await sut.use({
				email,
				password
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be possible to authenticate with wrong password', async () => {
		await usersRepository.create({
			name,
			email,
			password_hash: 'wrong-password'
		})

		await expect(async () => {
			await sut.use({
				email,
				password
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
