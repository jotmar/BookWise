import 'dotenv/config'
import { execSync } from 'child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'
import { prisma } from '@/lib/prisma'

function generateUrl(schema: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('Provide a valid DATABASE_URL.')
	}

	const newUrl = String(process.env.DATABASE_URL).replace('public', schema)

	return newUrl
}

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID()
		const newUrl = generateUrl(schema)

		process.env.DATABASE_URL = newUrl

		execSync('npx prisma db push')

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					`DROP SCHEMA IF EXISTS "${schema}" CASCADE`
				)

				await prisma.$disconnect()
			}
		}
	}
}
