import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from '../@errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
	email: string
	password: string
}

interface AuthenticateUseCaseResponse {
	user: User
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async use(
		data: AuthenticateUseCaseRequest
	): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(data.email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const isPasswordValid = await compare(data.password, user.password_hash)

		if (!isPasswordValid) {
			throw new InvalidCredentialsError()
		}

		return { user }
	}
}
