import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
	items: User[]
	create(data: Prisma.UserCreateInput): Promise<User>
	save(user: User): Promise<User>
	findById(id: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
}
