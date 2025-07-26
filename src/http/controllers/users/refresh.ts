import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
	const refreshToken = await reply.jwtSign(
		{
			role: request.user.role
		},
		{
			sign: {
				sub: request.user.sub,
				expiresIn: '7d'
			}
		}
	)

	const token = await reply.jwtSign(
		{
			role: request.user.role
		},
		{
			sign: {
				sub: request.user.sub
			}
		}
	)

	return reply
		.status(200)
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			sameSite: true,
			httpOnly: true,
			secure: true
		})
		.send({ token })
}
