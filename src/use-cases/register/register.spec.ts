import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { RegisterUseCase } from '@/use-cases/register/register'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '../@errors/user-already-exists-error'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
	let usersRepository: UsersRepository
	let sut: RegisterUseCase

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RegisterUseCase(usersRepository)
	})

	const [name, email, password] = ['John Doe', 'johndoe@example.com', '123456']

	it('should be possible to register', async () => {
		const { user } = await sut.use({
			name,
			email,
			password
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be possible to register with a duplicated email.', async () => {
		await sut.use({
			name,
			email,
			password
		})

		await expect(async () => {
			await sut.use({
				name,
				email,
				password
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})

	it('should have its user password hashed upon registration', async () => {
		const { user } = await sut.use({
			name,
			email,
			password
		})

		expect(await compare(password, user.password_hash)).toEqual(true)
	})
})
