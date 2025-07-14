import { PrismaClient } from '@prisma/client'
import { env } from '../env/setup'

export const prisma = new PrismaClient({
	log: env.NODE_ENV === 'dev' ? ['query'] : []
})
