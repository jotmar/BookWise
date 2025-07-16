import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../@errors/user-already-exists-error'

interface RegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

interface RegisterUseCaseResponse {
	user: User
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async use(data: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		/* Check if user already exists */

		const checkUser = await this.usersRepository.findByEmail(data.email)

		if (checkUser) {
			throw new UserAlreadyExistsError()
		}

		const { name, password, email } = data

		const password_hash = await hash(password, 6)

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash
		})

		return { user }
	}
}
