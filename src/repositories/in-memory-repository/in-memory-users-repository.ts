import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: data.id ?? randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date()
		}

		this.items.push(user)

		return user
	}

	async save(user: User): Promise<User> {
		const index = this.items.findIndex(item => user.id === item.id)
		this.items[index] = user

		return user
	}

	async findById(userId: string): Promise<User | null> {
		const user = this.items.find(item => item.id === userId)

		if (!user) {
			return null
		}

		return user
	}
	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find(item => item.email === email)

		if (!user) {
			return null
		}

		return user
	}
}
