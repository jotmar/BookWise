import { app } from './app'
import { env } from './env/setup'

app
	.listen({
		port: env.PORT,
		host: '0.0.0.0'
	})
	.then(() => {
		console.log('HTTP Server is Running...')
		console.log(`NODE_ENV: ${env.NODE_ENV}`)
	})
