import Fastify from 'fastify'
import mercurius from 'mercurius'
import { getGraphQLSchema } from './getGraphQLSchema'
import mercuriusAuth from 'mercurius-auth'
import fastifyCookie from 'fastify-cookie'
import * as dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify()

async function start() {
	const schema = await getGraphQLSchema()

	fastify.register(fastifyCookie, {
		secret: process.env['JWT_SECRET'] as string
	})

	fastify.register(mercurius, {
		schema,
		graphiql: true
	})

	fastify.register(mercuriusAuth, {
		authContext(_ctx) {
			return {
				identity: 'foo'
			}
		},
		async applyPolicy(_authDirectiveAST, _parent, _args, _context, _info) {
			return true
		},
		authDirective: 'auth'
	})

	try {
		await fastify.listen(process.env['PORT'] as string, '0.0.0.0')
		console.log(`Server listening at ${process.env['PORT']}`)
	} catch (e: unknown) {
		// TODO: properly type the error
		console.error(e)
		process.exit(1)
	}
}

start()
