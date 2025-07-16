import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env/setup'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET
})

app.register(fastifyCookie)
