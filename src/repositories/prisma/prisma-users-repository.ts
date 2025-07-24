import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
	items: User[] = []

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data: {
				id: data.id,
				email: data.email,
				name: data.name,
				password_hash: data.password_hash
			}
		})

		return user
	}

	async save(user: User): Promise<User> {
		const savedUser = await prisma.user.update({
			where: {
				id: user.id
			},
			data: user
		})

		return savedUser
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		})

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		return user
	}
}
